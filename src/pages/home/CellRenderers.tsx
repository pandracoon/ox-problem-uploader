import { UploadFeatures } from "interfaces/upload-features.interface"
import { IoMdAdd, IoMdWarning } from "react-icons/io"
import { problemsState, imageUrlsState, useGetunit } from "atoms";
import { RiDeleteBin6Line } from "react-icons/ri"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Tag, Image } from "antd";
import { Box } from "materials";
import { useState } from "react";
import { IoAdd, IoAddSharp, IoCloseSharp } from "react-icons/io5";
import { s3DeleteFile } from "api/s3/\bs3deleteFile";

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
export const AnswerRenderer = (value:string, record:UploadFeatures) => {
    const { answer } = record;
    return (
        <Tag 
            style={{fontSize:14}} 
            color={answer ? "blue" : "red"} 
            children={answer ? "O" : "X"} 
        />
    )
}

export const ChapterRenderer = (value:string, record:UploadFeatures) => {
    const unitInfo = useGetunit(+record.unit)
    return unitInfo ? (
        unitInfo.chapter    
    ) : (
        <IoMdWarning color="#FF4D4F" size={18} />
    )
}
export const UnitRenderer = (value:string, record: UploadFeatures) => {
    const unitInfo = useGetunit(+record.unit)
    return unitInfo ? (
        unitInfo.unit   
    ) : (
        <IoMdWarning color="#FF4D4F" size={18} />
    )
}



export const ImageNameRenderer = (_:any, record:UploadFeatures) => {
    const setImageUrls = useSetRecoilState(imageUrlsState);
    const [Modalvisible, onVisibleChange] = useState<boolean>(false);
    
    const urls = useRecoilValue(imageUrlsState)
    const url = urls.find(item => item.name === record.filename)
    
    const open = () => url && onVisibleChange(true);

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

    return (
        <Box>
            <Tag 
                color={url ? "blue" : "red"} 
                children={record.filename}
                onClick={open}
                style={{
                    flex: 1,
                    marginBottom:5,
                    cursor: 'pointer'
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
                <IoMdAdd size={18} />
            </>
            }
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