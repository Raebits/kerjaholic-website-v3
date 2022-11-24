import { useRouter } from "next/router";
import React from "react";
import { InputImageComponentProps } from "../../types/input/input-image-component-props";

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
  } from 'react-image-crop'
import { canvasPreview } from '../../helper/cropper/canvasPreview'
import 'react-image-crop/dist/ReactCrop.css'
import { imageConfigDefault } from "next/dist/server/image-config";
import { useDebounceEffect } from "../../helper/useDebounceEffect";

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
            unit: '%',
            width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}
  
const InputImageComponent = React.forwardRef<HTMLInputElement, InputImageComponentProps>(( { onChange, isShowed, placeholder, label, type, className, showValidInput, initValue },ref) => {

    const [ value, setValue ] = React.useState<File>(initValue)

    const isInvalid = (): boolean => {
        if (showValidInput && value == null) {
            return true
        }
        return false
    }

    const [imgSrc, setImgSrc] = React.useState('')
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const imgRef = React.useRef<HTMLImageElement>(null)
    const [crop, setCrop] = React.useState<Crop>()
    const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>()
    const [scale, setScale] = React.useState(1)
    const [rotate, setRotate] = React.useState(0)
    const [aspect, setAspect] = React.useState<number | undefined>(1 / 1)
    const [cropping, setCropping] = React.useState<boolean>(false)
    
    async function onSelectFile(e) {
        await isShowed(true)
        await setCropping(true)
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', (e) =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }

    }

    // set cropped possition
    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
        const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },100,[completedCrop, scale, rotate],
    )

    function getCroppedImg() {
        const canvas = document.getElementById('previewCanvas') as HTMLCanvasElement | null;;
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })
        
    }

    async function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = await new File([u8arr], filename, {type:mime});
        await onChange(croppedImage)
    }

    async function closeCrop() {
        await isShowed(false)
        await setCropping(false)
    }

    async function doCrop() {
        await getCroppedImg()
        await closeCrop()
    }

    return (
        <>
        <input
            ref={ref}
            onChange={(e) => onSelectFile(e)}
            type="file"
            hidden
            accept={type}
        />
        {cropping && (
            <div className = {`fixed top-0 left-0 flex  z-50 w-full h-screen`}>
                <div className = "relative bg-opacity-75 bg-gray-600 w-full h-screen items-center justify-center  flex flex-col">
                
                    {!!imgSrc && (
                        <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => {setCrop(percentCrop);}}
                        onComplete={async(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            onLoad={onImageLoad}
                            className = "max-h-full max-w-full "
                        />
                        </ReactCrop>
                    )}



                        {!!completedCrop && (
                            <div className = "absolute left-2 top-2 flex w-20 h-20 border-2 dark:border-white border-gray-300 rounded-lg">
                                <canvas
                                    id = "previewCanvas"
                                    ref={previewCanvasRef}
                                    className = "object-cover w-full rounded-md"
                                />
                            </div>
                        )}
                    <div className = "absolute bottom-0 flex p-2 items-center justify-center flex-row space-x-2 w-full pt-6">
                        <div className = "bg-green-500 rounded-full text-white p-3 w-1/3 flex items-center justify-center" onClick={() => doCrop()}>Selesai</div>
                        <div className = "bg-red-500 rounded-full text-white p-3 w-1/3 flex items-center justify-center" onClick={() => closeCrop()}>Batal</div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
});

export default InputImageComponent
