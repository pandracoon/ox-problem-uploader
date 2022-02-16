import { UploadFeatures } from "interfaces/upload-features.interface"
import { IoMdAdd, IoMdWarning } from "react-icons/io"
import { problemsState, imageUrlsState } from "atoms";
import { RiDeleteBin6Line } from "react-icons/ri"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Tag, Image, Popover, Divider } from "antd";
import { Box, Text } from "materials";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDeleteImage } from "./image-uploaders/hooks";
import styled from "styled-components";
// import { SingleImageUploader } from "./image-uploaders/single-image-uploader";

export const IsExamRenderer = (value:string, record:UploadFeatures) => {
    const { isExam } = record;
    return (
        <Tag 
            style={{fontSize:14}} 
            color={isExam ? "blue" : "green"} 
            children={isExam ? "기출" : "문제집"} 
        />
    )
}

export const ChapterRenderer = (value:string, {unit}:UploadFeatures) => {
    return unit.info ? unit.info.chapter : (
        <IoMdWarning color="#FF4D4F" size={18} />
    )
}
export const UnitRenderer = (value:string, {unit}: UploadFeatures) => {
    return unit.info ? unit.info.unit  : (
        <IoMdWarning color="#FF4D4F" size={18} />
    )
}


export const ImageNameRenderer = (_:any, record:UploadFeatures) => {
    const [Modalvisible, onVisibleChange] = useState<boolean>(false);
    const deleteImage = useDeleteImage()
    
    const urls = useRecoilValue(imageUrlsState)
    const url = urls.find(item => item.name === record.filename)
    
    const openImageView = () => url && onVisibleChange(true);

    const onRemove = () => {
        if(!url)
            return;
        if(!window.confirm('이미지를 삭제하시겠습니까?'))
            return;

        deleteImage(url.name, true)
    }

    // const [addImageModalVisible, setAddImageModalVisible] = useState<boolean>(false)
    // const openAddImageModal = () => setAddImageModalVisible(true)
    // const closeAddImageModal = () => setAddImageModalVisible(false)

    return (
        <Box>
            <Tag 
                color={url ? "blue" : "red"} 
                children={record.filename}
                onClick={openImageView}
                style={{
                    flex: 1,
                    marginBottom:5,
                    cursor: url ? 'pointer' : 'default'
                }}
            />
            {url ? (
            <>
                <IoCloseSharp size={18} onClick={onRemove}/>
                <Image
                    width={0}
                    style={{ display: 'none' }}
                    src={url.url}
                    preview={{
                        visible: Modalvisible,
                        src: url.url,
                        onVisibleChange
                    }}
                />
            </>)
            :
            <>
                {/* <IoMdAdd size={18} onClick={openAddImageModal}  />
                <SingleImageUploader 
                    visible={addImageModalVisible}
                    targetFilename={record.filename}
                    onCancel={closeAddImageModal}
                    onOk={closeAddImageModal}
                /> */}
            </>
            }
        </Box>
    )
    
}

const ModalClose = styled(RiDeleteBin6Line)`
    position: absolute;
    z-index:100;
    right: 0;
    font-size: 18px;
    cursor: pointer;
`
export const ChoiceRenderer = (_:any, {choices}:UploadFeatures) => {
    const imageUrls = useRecoilValue(imageUrlsState);
    const deleteImage = useDeleteImage()
    
    return (
        <Box justifyContent="center" >
            {choices.map(({index, question, solution, answer, filename}) => {
                const onRemove = () => {
                    if(!filename)
                        return;
                    if(!window.confirm('이미지를 삭제하시겠습니까?'))
                        return;
                    deleteImage(filename, true)
                }
                const image = filename ? imageUrls.find(img => img.name===filename) : undefined

                const content = (
                    <Box flexDirection="column" style={{width: 300}}>
                        <Text bold content={question} />
                        <Text content={`정답: ${answer ? "O" : "X"}`} />
                        <Text type="D2" content={solution} />
                        {filename && (
                            <>
                           <Divider style={{marginTop: 7, marginBottom: 7}}/>
                            <Box flexDirection="column"  style={{position: 'relative'}}>
                                <Text 
                                    type="D1" 
                                    content={"선지 이미지: "+filename} 
                                    marginBottom={4} 
                                />
                                {image ? (
                                <>
                                    <Image src={image.url}/> 
                                    <ModalClose color="#FF4D4F" onClick={onRemove} />
                                </>
                                ) : (
                                    <Text type="D2" content="선지 이미지를 업로드해 주세요."  color="red"/>
                                )}
                            </Box>
                            </>
                        )}
                    </Box>
                )

                // 이미지 파일이 있는데 업로드하지 않은 경우 업로드 준비 X
                const ready:boolean = !filename || Boolean(image)

                return (
                    <Popover 
                        key={question.slice(0,5)} 
                        title={`${index}번 선지`} 
                        content={content} trigger="hover"
                    >
                        <Tag 
                            color={ready ? "blue" : "red"}
                            children={index}
                            style={{width: 28, cursor: 'pointer'}}
                        />
                    </Popover>
                )
            }
            )}
        </Box>
    )
}

export const RowDeleter = (_:any, {filename}:UploadFeatures, index: number) => {
    const setProblems = useSetRecoilState(problemsState)
    const deleteImage = useDeleteImage()
    const onDelete = () => {
        deleteImage(filename, false)
            .then(() => {
                // 문제 리스트에서 삭제
                setProblems(prev => (
                    prev.slice(0, index)
                        .concat(prev.slice(index+1))
                ))
            })
    }
    return (
      <RiDeleteBin6Line onClick={onDelete} color="#FF4D4F" size={20} />
    )  
}