import { ChangeEvent } from "react";
import { atom, useSetRecoilState } from "recoil";
import { Photo } from "interfaces/photo.interface";
import { Crop } from 'react-image-crop';
import produce from "immer";
import { EXAM_ROUTINES } from "pages/png-upload/exam-routines";


export const examPNGPhotosState = atom<Photo[]>({
    key: 'exam/photos/png',
    default: []
})

export const useReadImages = () => {
    const setPhotos = useSetRecoilState(examPNGPhotosState)
    const readImages = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {target: {files: fileList}} = event;
        if(!fileList)
            return;
        const files = Array.from(fileList);

        files.forEach(async (file, pageNo) => {
            const reader = new FileReader();
            reader.onload = () => {
                const url = reader.result as string;
                const img = new Image();
                img.src=url;
                img.onload = function(){
                    const {width, height} = img
                    const {page, ...crop_props} = EXAM_ROUTINES[4]
                    const crop:Crop = {
                        unit: "%",
                        ...crop_props
                    }
                    setPhotos(prev => {
                        const problems:Photo[] = EXAM_ROUTINES
                            .filter(({page}) => page === pageNo)
                            .map(({page, ...crop_props}) => ({
                                url,
                                crop: {
                                    unit: "%",
                                    ...crop_props
                                },
                                width,
                                height
                            }))
                        return prev.concat(problems)
                    });
                }
            };
            reader.readAsDataURL(file)
        })
    }
    return readImages
}

export const useSetCrop = () => {
    const setCrop = useSetRecoilState(examPNGPhotosState)
    const crop = (index: number, crop:Crop) => {
        setCrop(
            produce(draft => {
                draft[index].crop=crop;
            })
        )
    }
    return crop
}