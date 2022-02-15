import { UploadFeatures } from "interfaces/upload-features.interface"
import { IoMdAdd, IoMdWarning } from "react-icons/io"
import { problemsState, imageUrlsState } from "atoms";
import { RiDeleteBin6Line } from "react-icons/ri"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Tag, Image, Popover } from "antd";
import { Box, Text } from "materials";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { s3DeleteFile } from "api/s3/\bs3deleteFile";
import { SingleImageUploader } from "./image-uploaders/single-image-uploader";

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
    return unit ? unit.chapter : (
        <IoMdWarning color="#FF4D4F" size={18} />
    )
}
export const UnitRenderer = (value:string, {unit}: UploadFeatures) => {
    return unit ? unit.unit  : (
        <IoMdWarning color="#FF4D4F" size={18} />
    )
}


export const ImageNameRenderer = (_:any, record:UploadFeatures) => {
    const setImageUrls = useSetRecoilState(imageUrlsState);
    const [Modalvisible, onVisibleChange] = useState<boolean>(false);
    
    const urls = useRecoilValue(imageUrlsState)
    const url = urls.find(item => item.name === record.filename)
    
    const openImageView = () => url && onVisibleChange(true);

    const onRemove = () => {
        if(!url)
            return;
        if(!window.confirm('이미지를 삭제하시겠습니까?'))
            return;

        setImageUrls(prev => {
            const index = prev.findIndex(item => item.name === url.name);
            if(index > -1){
                return prev.slice(0, index).concat(prev.slice(index+1))
            }
            else return prev;
        });

        s3DeleteFile(url.url)
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

export const ChoiceRenderer = (_:any, {choices}:UploadFeatures) => {
    return (
        <Box justifyContent="center">
            {choices.map(({index, question, solution, answer}) => {
                const content = (
                    <Box flexDirection="column">
                        <Text bold content={question} />
                        <Text content={`정답: ${answer ? "O" : "X"}`} />
                        <Text type="D2" content={solution} />
                    </Box>
                )

                return (
                    <Popover 
                        key={question.slice(0,5)} 
                        title={`${index}번 선지`} 
                        content={content} trigger="hover"
                    >
                        <Tag 
                            color="blue"
                            children={index}
                            style={{cursor: 'pointer'}}
                        />
                    </Popover>
                )
            }
            )}
        </Box>
    )
}

export const RowDeleter = (_:any, {filename}:UploadFeatures, index: number) => {
    const [imageUrls, setImageUrls] = useRecoilState(imageUrlsState);
    const [problems, setProblems] = useRecoilState(problemsState)
    const filenames = problems.map(p => p.filename)

    // 그림파일을 등록했으면서 다른 파일이 그림을 공유하는 경우, 그림을 삭제하면 안 됨
    // 그 외의 경우는 삭제 가능
    const isImageNeeded = imageUrls.findIndex(f => f.name === filename) && 
        filenames.indexOf(filename) !== filenames.lastIndexOf(filename)

    const onDelete = () => {
        if(!isImageNeeded){
            // name - url map과 s3 상 파일 모두 제거
            setImageUrls(prev => {
                const index = prev.findIndex(item => item.name === filename);
                if(index > -1){
                    s3DeleteFile(prev[index].url)
                    return prev.slice(0, index).concat(prev.slice(index+1))
                }
                else return prev;
            });
        }

        setProblems(prev => prev.slice(0, index).concat(prev.slice(index+1)))
    }
    return (
      <RiDeleteBin6Line onClick={onDelete} color="#FF4D4F" size={20} />
    )  
}