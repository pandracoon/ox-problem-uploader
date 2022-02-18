import { Button, Divider, Input, Switch, Tag } from "antd"
import Modal from "antd/lib/modal/Modal"
import { examPNGProblemsState, useResetChoices, useSetChoices } from "atoms/pngPhotos"
import { IPhoto } from "interfaces/photo.interface"
import { Box, Text } from "materials"
import { Fragment, useEffect, useState } from "react"
import ReactCrop, { Crop } from "react-image-crop"
import { useRecoilValue } from "recoil"
import { getCroppedImg } from "utils/getCroppedImg"

interface ChoicesEditorProps {
    index: number
    isKor: boolean
}

export const ChoicesEditor = ({index:problem_index, isKor}:ChoicesEditorProps) => {
    const {choices, photo} = useRecoilValue(examPNGProblemsState)[problem_index]
    const resetChoices = useResetChoices()
    const getSetter = useSetChoices()
    const {
        setQuestion,
        setAnswer,
        setSolution,
        setPhoto,
        setDescription
    } = getSetter(problem_index)


    useEffect(() => {
        resetChoices(problem_index, isKor)
    },[isKor])

    const [tempPhoto, setTempPhoto] = useState<IPhoto>(photo)
    // modal을 open하면 현재 선택된 이미지를 전체 이미지로 설정, 그 안에서 crop하도록
    useEffect(() => {
        getCroppedImg(photo)
            .then((res) =>
                 setTempPhoto({
                    ...res, 
                    crop: {
                        unit: "%", 
                        x:0,
                        y:0,
                        width: 100,
                        height: 100
                    }
                })
            )
    },[])
    // modal에서 crop onChange하는 경우
    const onCropChange = (_:Crop, crop: Crop) => {
        setTempPhoto(prev => ({...prev, crop}))
    }

    // for 세부 이미지
    const [targetChoiceIndex, setTargetChoiceIndex] = useState<string | null>(null)
    const [photoModalVisible, setPhotoModalVisible] = useState<boolean>(false)
    const openPhotoModal = (choice_index: string) => () => {
        // target 선지 설정
        setTargetChoiceIndex(choice_index)
        setPhotoModalVisible(true)
    }
    const cancelPhotoModal = () => {
        // target 선지 초기화
        setTargetChoiceIndex(null)
        setPhotoModalVisible(false)
    }
    
    const okPhotoModal = () => {
        if(!targetChoiceIndex)
            return;
        // 전역 변수에  반영
        setPhoto(targetChoiceIndex, tempPhoto)
        setTargetChoiceIndex(null)
        setPhotoModalVisible(false)
    }

    const removePhoto = () => {
        if(!targetChoiceIndex)
            return;
        // 전역 변수에  반영
        setPhoto(targetChoiceIndex, undefined)
        setTargetChoiceIndex(null)
        setPhotoModalVisible(false)
    }
    
    return (
        <Box flexDirection="column" flex={1}>
            {choices.map(({index, question, answer, solution, description, photo}, i) => (
                <Fragment key={i}>
                <Box flexDirection="column" key={"choice"+i}>
                    <Box alignItems="center">
                        <Tag
                            color="geekblue"
                            children={index+"."}
                        />
                        <Input
                            placeholder="선지 내용"
                            value={question}
                            onChange={setQuestion(index)}
                        />
                        <Text 
                            type="P2"
                            align="right"
                            content="정답:"
                            style={{width: 42}}
                            marginHorizontal={12}
                        />
                        <Switch 
                            checkedChildren="O"
                            unCheckedChildren="X"
                            checked={answer}
                            onChange={setAnswer(index)}
                        />
                    </Box>
                    
                    <Box marginTop={8}>
                        <Input.TextArea
                            placeholder="정답 해설"
                            autoSize={{ minRows: 2, maxRows: 2 }}
                            value={solution}
                            onChange={setSolution(index)}
                        />
                    </Box>

                    <Box marginTop={8} alignItems="center">
                        <Input
                            placeholder="자료 해설(빈칸으로 두면 문제와 동일)"
                            value={description}
                            onChange={setDescription(index)}
                        />
                        <Button 
                            style={{marginLeft: 10}} 
                            onClick={openPhotoModal(index)} 
                            type={photo ? "default" : "primary"}
                        >
                            선지 상세 이미지 {photo ? "수정" : "추가"}
                        </Button>

                    </Box>

                </Box>
                <Modal 
                    visible={photoModalVisible} 
                    title={`선지 ${index}번 그림`} 
                    onCancel={cancelPhotoModal} 
                    onOk={okPhotoModal}
                >
                    <ReactCrop src={tempPhoto.url} crop={tempPhoto.crop} onChange={onCropChange} />
                    {choices.find(c => c.index===targetChoiceIndex)?.photo && (
                        <Box justifyContent="flex-end">
                            <Button type="primary" danger onClick={removePhoto}>
                                선지 상세 이미지 삭제
                            </Button>
                        </Box>
                    )}
                </Modal>
                <Divider key={"divider"+i}  />
                </Fragment>
            ))}
        </Box>
    )
}