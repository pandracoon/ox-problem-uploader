import { Modal } from 'antd'
import { examPNGProblemsState, useSetCrop } from 'atoms/pngPhotos'
import { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

interface ImageWithCropperProps {
    index: number
}
const ImageContainer = styled.div`
    canvas {
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
`

const MAX_WIDTH = 480;

export const ImageWithCropper = ({index}:ImageWithCropperProps) => {
    const {url, crop, width, height} = useRecoilValue(examPNGProblemsState)[index].photo
    const imageRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)


    let WIDTH=MAX_WIDTH;
    let HEIGHT=(WIDTH*height*crop.height)/(width*crop.width)

    useEffect(() => {
        if(!imageRef.current)
            return;
        canvasRef.current
            ?.getContext('2d')
            ?.drawImage(
                imageRef.current,
                crop.x*width/100,
                crop.y*height/100,
                width*crop.width/100,
                height*crop.height/100,
                0,0,
                WIDTH,
                HEIGHT
            );
    }, [crop.x, crop.y, crop.width, crop.height])

    const [visible, setVisible] = useState<boolean>(false);
    const openModal = () => setVisible(true);

    const setCrop = useSetCrop()

    const [tempCrop, setTempCrop] = useState<Crop>(crop);
    const onChange = (_:Crop, crop:Crop) => setTempCrop(crop)
    const closeModal = () => {
        setCrop(index, tempCrop)
        setVisible(false);
    }



    return (
        <ImageContainer>
            <img
                ref={imageRef}
                style={{display: 'none'}}
                src={url}
            />
            <canvas 
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
                onClick={openModal}
            />
            <Modal
                title="이미지 자르기" visible={visible} onCancel={closeModal} onOk={closeModal}>
                <ReactCrop src={url} crop={tempCrop} onChange={onChange} />
                {/* <ReactCrop src={url} crop={tempCrop} onChange={setTempCrop} /> */}
            </Modal>
        </ImageContainer>
    )
}