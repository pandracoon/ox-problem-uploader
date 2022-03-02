import { Button, Image, InputNumber } from "antd"
import Modal from "antd/lib/modal/Modal";
import { examPNGProblemsState } from "atoms/pngPhotos";
import { EXAM_ROUTINES } from "data/exam-routines";
import { PNGUploadProblemFeature } from "interfaces/png-upload-problem-feature.interface";
import { Box, ImageAsURLReader, ReadImageProps, Text } from "materials"
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";


const EXAM_EXAMPLE_4 = "https://user-images.githubusercontent.com/30591542/155272931-dcb0f479-235e-40d1-b73c-8a3ecc83adb5.png";
const EXAM_EXAMPLE_5 = "https://user-images.githubusercontent.com/30591542/155272924-a9955da1-4018-434e-9fff-814805a91df6.png";
const EXAM_EXAMPLE_6 = "https://user-images.githubusercontent.com/30591542/155272930-7c4a142b-e446-44b7-b4b0-983f13a30e9f.png";
const EXAM_EXAMPLE_7 = "https://user-images.githubusercontent.com/30591542/155272932-3ed496a9-6861-474c-a4d1-87f2eecfcd5d.png";
const EXAM_EXAMPLES = [ EXAM_EXAMPLE_4, EXAM_EXAMPLE_5, EXAM_EXAMPLE_6, EXAM_EXAMPLE_7 ]

const ExamFormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;

    margin-top: 4px;
    span {
        text-align: center;
    }


`

const FormSelectButton = styled.button<{selected: boolean}>`
    background: #fff;
    padding: 10px 5px 6px 5px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: ${({selected}) => selected ? "solid #0969c8 2px" : "none" };

    :hover {
        ${({selected}) => !selected && "box-shadow: rgba(149, 157, 165, 0.16) 0px 8px 24px;"}
    }
    ${({selected}) => selected && "box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;" }
    img {
        width: 100%;
    }
`

interface PNGUploadModalProps {
    visible: boolean
    onCancel: () => void
}
export const PNGUploadModal = ({visible, onCancel}:PNGUploadModalProps) => {
    const setProblems = useSetRecoilState(examPNGProblemsState)

    // 시험지 파일 업로드 관련
    const [fileProps, setFileProps] = useState<ReadImageProps>({url: "", width: 0, height: 0})
    const resetFileProps = () => setFileProps({url: "", width: 0, height: 0})

    // 시작 문제 번호
    const [startIndex, setStartIndex] = useState<number>(0);

    const [selected, setSelected] = useState<number>(0)
    const select = (num: number) => () => setSelected(num)

    const [imageModalVisible, setImageModalVisible] = useState<boolean>(false)

    const onOk = () => {
        if(!fileProps.url){
            alert('시험지 이미지 파일(.png)을 등록해 주세요.')
            return;
        }
        if(!startIndex ){
            alert('문제 시작 번호를 입력해주세요.')
            return;
        }
        if(startIndex+selected > 21 ){
            alert('문제 시작 번호를 확인해주세요.')
            return;
        }
        if(selected < 4 || selected > 7){
            alert('페이지 당 문제 수를 골라주세요.')
            return;
        }

        const routine = EXAM_ROUTINES[selected]
        setProblems(prev => {
            const problems:PNGUploadProblemFeature[] = 
                routine.map((crop_props, idx) => ({
                    index: startIndex+idx,
                    useImage: true,
                    photo: {
                        ...fileProps,
                        crop: {
                            unit: "%",
                            ...crop_props
                        },
                    },
                    solution: "",
                    description: "",
                    correct_rate: 0,
                    choices: [],
                }))
            return prev.concat(problems).sort((a, b) => a.index - b.index)
        });

        resetFileProps()
        onCancel()
    }

    return (
        <Modal
            title="문제 png 업로드"
            okText="문제 등록"
            onOk={onOk}
            cancelText="취소"
            visible={visible} 
            onCancel={onCancel}
        >

            <Box flexDirection="column">
                {fileProps.url ? 
                    <Box marginBottom={12} justifyContent="space-between">
                        <Text type="P1" content="1. 이미지 선택 완료" color="#0969c8" marginBottom={12}/>
                        <Button size="small" danger type="primary" onClick={resetFileProps}>
                            삭제
                        </Button>
                        <Image 
                            src={fileProps.url} 
                            width="50%"
                            preview={{
                                visible: imageModalVisible,
                                src: fileProps.url,
                                onVisibleChange: setImageModalVisible
                            }}
                        />
                    </Box>
                    : (
                        <>
                    <Text type="P1" content="1. 시험지의 png 파일을 올려주세요." />
                    <Text type="D1" content="*1장만 업로드 가능합니다." marginBottom={6} />
                    <ImageAsURLReader onLoad={setFileProps} />
                    </>
                )}

                 <Text type="P1" content="2. 업로드할 시험지의 첫 문제 번호를 입력해주세요." marginTop={16} marginBottom={4} />
                 <InputNumber 
                    min={1}
                    max={21-selected}
                    value={startIndex}
                    onChange={setStartIndex}
                    placeholder="1"
                 />

                 <Text type="P1" content="3. 시험지의 문제 배치(페이지당 문제 수)를 골라주세요." marginTop={16} />
                 <ExamFormGrid>
                    {EXAM_EXAMPLES.map((src, index) => {
                        return (
                            <FormSelectButton 
                                key={index}
                                selected={selected===index+4} 
                                onClick={select(index+4)}
                            >
                                <img alt={`exam${index+4}`} src={src}/>
                                <span >
                                    문제 {index+4}개
                                </span>
                            </FormSelectButton>
                        )  
                    })}
                 </ExamFormGrid>
            </Box>
        </Modal>
    )

}