import styled from "styled-components";
import { useReadImages } from "atoms/pngPhotos";
import { Fragment } from "react";


const Form = styled.form`
    display: flex;
    .png-file {
        display: none;
    }
`

const ExamFormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    img {
        width: 100%;
    }
    span {
        text-align: center;
    }
    & > label {
        padding: 10px 5px 6px 5px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        :hover {
            background-color: #f5f5f5;
        }
    }
`


interface PNGUploaderProps {
    canUpload: boolean
    startIndex: number
}


const EXAM_EXAMPLE_4 = "https://user-images.githubusercontent.com/30591542/155272931-dcb0f479-235e-40d1-b73c-8a3ecc83adb5.png";
const EXAM_EXAMPLE_5 = "https://user-images.githubusercontent.com/30591542/155272924-a9955da1-4018-434e-9fff-814805a91df6.png";
const EXAM_EXAMPLE_6 = "https://user-images.githubusercontent.com/30591542/155272930-7c4a142b-e446-44b7-b4b0-983f13a30e9f.png";
const EXAM_EXAMPLE_7 = "https://user-images.githubusercontent.com/30591542/155272932-3ed496a9-6861-474c-a4d1-87f2eecfcd5d.png";
const EXAM_EXAMPLES = [ EXAM_EXAMPLE_4, EXAM_EXAMPLE_5, EXAM_EXAMPLE_6, EXAM_EXAMPLE_7 ]

export const PNGUploader = ({canUpload, startIndex}:PNGUploaderProps) => {
    const readImages = useReadImages()

    return (
        <Form>
            <ExamFormGrid>
                {canUpload && EXAM_EXAMPLES.map((src, index) => {
                    return (
                    <Fragment key={index}>
                        <label htmlFor={`png-file-${index+4}`}>
                            <img alt={`exam${index+4}`} src={src}/>
                            <span>
                                문제 {index+4}개인 경우
                            </span>
                        </label>

                        <input
                            disabled={!canUpload}
                            id={`png-file-${index+4}`}
                            className="png-file"
                            type="file"
                            accept=".png"
                            onChange={readImages(index+4, startIndex)}
                        />
                    </Fragment>
                    )  
                })}
            </ExamFormGrid>
        </Form>
    );
}
