import { ChangeEvent } from "react";
import styled from "styled-components";


export interface ReadImageProps {
    url: string
    width: number
    height: number
}
interface ImageReaderProps {
    onLoad: (props: ReadImageProps) => void
}

const Container = styled.div`
    #image-input {
        display: none;
    }
`

export const ImageAsURLReader = ({onLoad}:ImageReaderProps) => {

    const readImage = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    
        const {target: {files: fileList}} = event;
        if(!fileList)
            return;
    
        const file = Array.from(fileList)[0];
        const reader = new FileReader();
        reader.onload = () => {
            const url = reader.result as string;
            const img = new Image();
            img.src=url;
            img.onload = function(){
                const {width, height} = img
                onLoad({url, width, height})
            }
        };
        reader.readAsDataURL(file)
    }
    
    return (
        <Container>
            <label htmlFor="image-input" className="ant-btn ant-btn-ghost">
                파일 업로드
            </label>
            <input 
                onChange={readImage}
                type="file"
                accept=".png"
                id="image-input"
            />
        </Container>
    )
}