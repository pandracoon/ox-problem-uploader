import { Button, Pagination } from "antd"
import { Box, Text } from "materials"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { PNGUploader } from "./png-uploader"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { examPNGPhotosState } from "atoms/pngPhotos"
import { ImageWithCropper } from "./ImageWithCropper"
import { ProblemPreview } from "./ProblemPreview"
import media from "style/media"


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 60px;
`

const GridBox = styled.div`
    display: grid;
    width: 100vw;
    ${media.huge`grid-template-columns: repeat(3, 1fr);`}
    ${media.tablet`grid-template-columns: repeat(3, 1fr);`}
    margin-top: 20px;
    gap: 20px;
`


export function PNGUpload(){
    const photos = useRecoilValue(examPNGPhotosState)
    const resetPhotos = useResetRecoilState(examPNGPhotosState)


    const [currentPage, setCurrentPage] = useState<number>(1);

    const navigate = useNavigate()
    const toHome = () => navigate('/')
    const toConvertPDF2PNG = () => window.open('https://pdf2png.com/ko/')



    return (
        <Wrapper>
            <Box 
                justifyContent="space-between" 
                alignItems="center"
                marginBottom={24} 
            >
                <Box alignItems="center">
                    <Text type="H1" content="PNG로 추가하기" marginRight={18} />
                    <Button type="link" onClick={toHome}>
                        홈으로
                    </Button>
                </Box>

                <Box alignItems="center">
                    <PNGUploader />
                    <Button type="ghost" danger onClick={resetPhotos}>
                        파일 삭제
                    </Button>
                    <Button type="link" onClick={toConvertPDF2PNG}>
                        PDF→PNG 변환하기
                    </Button>
                </Box>

            </Box>

            <GridBox>
                {photos.map((_, idx) => (
                    <ProblemPreview index={idx} key={idx} />
                ))}
            </GridBox>
        </Wrapper>
    )
}