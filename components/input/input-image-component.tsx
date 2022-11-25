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
    const [isImgPotrait, setIsImgPotrait] = React.useState<boolean>(false)
    const [windowSize, setWindowSize] = React.useState(getWindowSize());

    React.useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    async function onSelectFile(e) {
        
        if (e.target.files && e.target.files.length > 0) {
            await setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', (e) =>
                init(reader),
            )
            reader.readAsDataURL(e.target.files[0])
            
        }
    }

    async function init (reader){
        await setImgSrc(reader.result?.toString() || '')
        isShowed(true)
        setCropping(true)
    }

    // set cropped possition
    async function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = await e.currentTarget
            await setCrop(centerAspectCrop(width, height, aspect))
        }
        if(imgRef.current.naturalHeight > imgRef.current.naturalWidth){
            setIsImgPotrait(true)
        }else{
            setIsImgPotrait(false)
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
                    {!!completedCrop && (
                            <div className = "absolute flex left-2 top-2 h-20 w-20 mx-3 z-50 p-1 bg-white">
                            <canvas
                                id = "previewCanvas"
                                ref={previewCanvasRef}
                                // className = "object-cover"
                            />
                            </div>
                    )}
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
                            className = {`${isImgPotrait ? ("h-[calc(100vh-400px)] sm:h-[calc(100vh-200px)] lg:h-screen w-auto ") : ("w-full h-auto lg:h-screen lg:w-auto")} object-fit`}
                          
                        />
                        </ReactCrop>
                    )}



                        
                    <div className = "fixed bottom-3 flex items-center justify-center flex-row space-x-2 w-full pt-6">
                        
                        <div className = "bg-green-500 rounded-full text-white text-xs px-4 py-4 flex items-center justify-center" onClick={() => doCrop()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>

                        </div>
                        <div className = "bg-red-500 rounded-full text-white text-xs px-4 py-4 flex items-center justify-center" onClick={() => closeCrop()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                    </div>
                    <div className = "fixed right-3 text-xs top-3 text-gray-400">
                        Size: {imgRef.current?.naturalWidth} x {imgRef.current?.naturalHeight}
                        
                    </div>
                </div>
            </div>
        )}
        </>
    );
});

export default InputImageComponent
