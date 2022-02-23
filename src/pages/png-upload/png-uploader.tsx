import styled from "styled-components";
import { useReadImages } from "atoms/pngPhotos";
import { Fragment } from "react";


const Form = styled.form`
    display: flex;
    padding: 4px 0;
    label {
        display: flex;
        align-items: center;
        padding: 0 8px;
        margin-right: 12px;
    }
    .png-file {
        display: none;
    }
`

const problemNumberByPage = ["1~6", "7~12", "13~16", "17~20"];

interface PNGUploaderProps {
    canUpload: boolean
}

export const PNGUploader = ({canUpload}:PNGUploaderProps) => {
    const readImages = useReadImages()

    return (
        <Form>
            {canUpload && problemNumberByPage.map((numbers, index) => (
                <Fragment key={numbers}>
                    <label 
                        className="ant-btn ant-btn-ghost"
                        htmlFor={`png-file-${index+1}`}
                    >
                        {index+1}페이지 업로드({numbers}번)
                    </label>
                    <input
                        disabled={!canUpload}
                        id={`png-file-${index+1}`}
                        className="png-file"
                        type="file"
                        accept=".png"
                        onChange={readImages(index)}
                    />
                </Fragment>
            ))}
        </Form>
    );
}
