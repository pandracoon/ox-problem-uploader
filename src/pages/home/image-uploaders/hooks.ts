import Upload, { RcFile } from "antd/lib/upload";
import { currentSubjectState, imageUrlsState, problemsState } from "atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { s3UploadFile } from "api/s3/\bs3uploadFile";
import { UploadFile } from "antd/lib/upload/interface";
import { s3DeleteFile } from "api/s3/\bs3deleteFile";

export const useUploadFiles = () => {
    const { code, name } = useRecoilValue(currentSubjectState)
    const [imageUrls, setImageUrls] = useRecoilState(imageUrlsState);
    const problems = useRecoilValue(problemsState)

    const addImageUrlMap = (name: string, url: string) => {
        setImageUrls(prev => {
            if(prev.findIndex(item => item.name === name) > -1)
                return prev;
            else 
                return [...prev, {name, url}]
            
        })
    }

    const handleFiles = (file:RcFile, fileList:RcFile[]) => {
        // 파일명에서 확장자 제거
        const fname = file.name.trim().replace(/(.png|.jpg|.jpeg|.gif)$/,'').normalize();
        
        // 사진 관련 문제가 업로드 되었는지 검사
        const problemHasUploaded = problems.map(p => p.filename === fname).some(i => i)
        if(!problemHasUploaded){
            alert(`${file.name}에 대한 문제가 업로드 되지 않았습니다.`)
            return Upload.LIST_IGNORE;
        }


        // 중복 파일 검사
        const uploadedFiles = fileList.map(f => f.name)
        const isDuplicate = uploadedFiles.indexOf(file.name) !== uploadedFiles.lastIndexOf(file.name)
        if(isDuplicate){
            alert(`${file.name}가 중복으로 업로드 되었습니다.`)
            return Upload.LIST_IGNORE;
        }

        // 로컬스토리지 중복 파일 검사
        const uploadedLocalFiles = imageUrls.map(f => f.name)
        const isDuplicateLocal = uploadedLocalFiles.indexOf(fname) > -1
        if(isDuplicateLocal){
            alert(`${file.name}는 이미 업로드 되어있습니다.`)
            return Upload.LIST_IGNORE;
        }

        return true;
    }

    const customRequest = async ({ file, onError, onSuccess, onProgress }:UploadRequestOption) => {
        if(!code || typeof file === "string" || !(file instanceof File))
            return false;
        try{
            // 업로드한 파일 이름
            const fname = file.name.trim().replace(/(.png|.jpg|.jpeg|.gif)$/,'').normalize();
            const targetProblem = problems.find(p => p.filename === fname);
            if(!targetProblem)
                throw Error("해당하는 문제가 없습니다.")
            
            // S3에 저장될 파일 이름
            const s3Filename = targetProblem.isExam ? 
                `${targetProblem.year}_${targetProblem.month}월_${targetProblem.org}_${targetProblem.source}_${name}_no${targetProblem.number}` 
                : 
                `${targetProblem.year}_${targetProblem.org}_${targetProblem.source}_${name}_${targetProblem.number}` 
            const url = await s3UploadFile(file, code, s3Filename)
            addImageUrlMap(fname, url)
            onSuccess && onSuccess(() => {})
            return true;
        } catch(e:any) {
            onError && onError(e)
            return false;
        }
    }

    const remove = (file:UploadFile) => {
        setImageUrls(prev => {
            const index = prev.findIndex(item => item.name === file.name);
            s3DeleteFile(prev[index].url)
            if(index > -1){
                return prev.slice(0, index).concat(prev.slice(index+1))
            }
            else return prev;
        });
    }

    return {
        handleFiles,
        customRequest,
        remove
    }
}