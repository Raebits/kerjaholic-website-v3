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
    const [croppingLoading, setCroppingLoading] = React.useState<boolean>(false)
    const [imgClass, setImgClass] = React.useState<string>("")
    const [fitW, setFitW] = React.useState<number>(0)
    const [fitH, setFitH] = React.useState<number>(0)
    
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
        const { innerWidth:dWidth,  innerHeight:dHeight } = window
        const imHeight = imgRef.current.naturalHeight
        const imWidth = imgRef.current.naturalWidth
        
        // const pClass = "h-[calc(100vh-400px)] sm:h-[calc(100vh-200px)] lg:h-screen w-auto "
        // const lClass = "w-full h-auto lg:h-screen lg:w-auto"

        // console.log(innerHeight,'dh')
        // console.log(innerWidth,"dw")
        // console.log(imHeight,'imh')
        // console.log(imWidth,'imw')
        var imgScalling = await imScaller(dHeight, dWidth, imHeight, imWidth)
        await setFitW(imgScalling.w)
        await setFitH(imgScalling.h)

        if (aspect) {
            // const { width, height } = await e.currentTarget
            await setCrop(centerAspectCrop(imgScalling.w, imgScalling.h, aspect))
        }
                
        if( imHeight > imWidth){

            await setImgClass("h-["+imgScalling.h+"px] "+"w-["+imgScalling.w+"px]" )
        }else{


            await setImgClass("h-["+imgScalling.h+"px] "+"w-["+imgScalling.w+"px]" )
        }

        

        
    }

    function imScaller( dHeight, dWidth, imHeight, imWidth ){
        const hRatio = dHeight / imHeight * 100
        const wRatio = dWidth / imWidth * 100
        // console.log(hRatio,'hRatio')
        // console.log(wRatio,'wRatio')
        var niHeight = 0
        var niWidth = 0

        // height kurang
        if(dHeight < imHeight){
            niHeight = imHeight - (imHeight - dHeight )
            niWidth = imWidth * niHeight / imHeight
            // console.log(niHeight)
            // console.log(niWidth)
            // checking width is over ?
            if(dWidth < niWidth ){
                niWidth = niWidth - (niWidth - dWidth )
                niHeight = imHeight * niWidth / imWidth
                
            }
            return {h: niHeight, w: niWidth, st:'ok'}
        }
        else if (dWidth < imWidth){
            niWidth = imWidth - ( imWidth - dWidth)
            niHeight = imHeight * (niWidth / imWidth )

            if(dHeight < niHeight){
                niHeight = niHeight - (niHeight - dHeight )
                niWidth = imWidth * niHeight / imHeight
                
            }
            return {h: niHeight, w: niWidth}
        }
        else{
            return {h: imHeight, w: imWidth}
        }
        // const spacer = 5
        // if(imWidth > dWidth){
        //     imWidth = imWidth - (dWidth-imHeight + spacer)
        //     imHeight = imHeight - 5
        // }
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
        await closeCrop()
        await setCroppingLoading(false)
    }

    async function closeCrop() {
        await isShowed(false)
        await setCropping(false)
    }

    async function doCrop() {
        setCroppingLoading(true)
        await getCroppedImg()
        
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
                            // className = {`${imgClass} object-contain`}
                            style = {{width: fitW, height: fitH}}
                          
                        />
                        </ReactCrop>
                    )}



                    
                    <div className = "fixed bottom-3 flex items-center justify-center flex-row space-x-2 w-full pt-6">
                        
                        <div className = "bg-green-500 rounded-full text-white text-xs px-4 py-4 flex items-center justify-center" onClick={() => !croppingLoading && (doCrop())}>
                            {!croppingLoading ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            ):(
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-spin">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            )}

                        </div>
                        <div className = "bg-red-500 rounded-full text-white text-xs px-4 py-4 flex items-center justify-center" onClick={() => closeCrop()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
