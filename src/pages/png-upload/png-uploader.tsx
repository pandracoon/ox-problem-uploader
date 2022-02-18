import { RiImageEditLine } from "react-icons/ri";
import styled from "styled-components";
import { Text } from "materials"
import { useReadImages } from "atoms/pngPhotos";


const Form = styled.form`
    display: flex;
    margin-right: 12px;
    padding: 4px 0;
    :hover {
        background-color: #eee;
    }
    label {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: underline;
        padding: 0 8px;
    }
    #png-file {
        display: none;
    }
`

export const PNGUploader = () => {
    const readImages = useReadImages()
    return (
        <Form>
            <label htmlFor="png-file">
                <RiImageEditLine size={28} />
                <Text 
                    type="P2" 
                    bold
                    content="시험지 png 파일 업로드하기" 
                    marginLeft={8}
                />
            </label>
            <input 
                id="png-file"
                type="file"
                multiple
                accept=".png"
                onChange={readImages}
            />
        </Form>
    );
}
