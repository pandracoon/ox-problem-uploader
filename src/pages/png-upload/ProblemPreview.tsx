import styled from "styled-components"
import { ImageWithCropper } from "./ImageWithCropper"

interface ProblemPreviewProps {
    index: number
}

const Container = styled.div`
    display: flex;
`
export const ProblemPreview = ({index}:ProblemPreviewProps) => {
    return (
        <Container>
            <ImageWithCropper index={index} />
        </Container>
    )
}