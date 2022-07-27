import { Modal } from "antd"
import { s3EditFile } from "api/s3/\bs3editFile"
import { useMemo, useState } from "react"
import ReactCrop, { Crop } from "react-image-crop"

interface ImageEditModalProps {
    visible: boolean
    setVisible: (state: boolean) => void
    setCurrentImage: (url: string) => void
    src: string
}
export const ImageEditModal = ({visible, setVisible, setCurrentImage, src}:ImageEditModalProps) => {
    const source = useMemo(() => src+`?timestamp=${new Date().getTime()}`, [src])
    const [crop, _setCrop] = useState<Crop>({
        unit: "%",
        x: 0,
        y: 0,
        width: 100,
        height: 100
    })

    const [image, setImage] = useState<HTMLImageElement | null>(null)

    const close = () => setVisible(false)
    const onCrop = async () => {
        if(!image)
            return;

        const base64 = getCroppedImage(image, crop)
        await s3EditFile(base64, src)
        setVisible(false)
        setCurrentImage(`${src}?t=${new Date().getTime()}`)
    }

    return (
        <Modal 
            title="이미지 수정"
            visible={visible}
            onCancel={close}
            onOk={onCrop}
        >
            <ReactCrop 
                crossorigin="anonymous"
                src={source} 
                crop={crop}
                onImageLoaded={setImage}
                onChange={_setCrop} 
            />

        </Modal>
    )
}

const getCroppedImage = (image:HTMLImageElement, crop:Crop) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    
    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    
    ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    );
    return canvas.toDataURL("image/png", 1)
}
