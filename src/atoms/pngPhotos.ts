import { ChangeEvent, useCallback, useState } from "react";
import { atom, useSetRecoilState } from "recoil";
import { Crop } from 'react-image-crop';
import produce from "immer";
import { EXAM_ROUTINES } from "data/exam-routines";
import { PNGUploadProblemFeature } from "interfaces/png-upload-problem-feature.interface";
import { useGetunit } from "./subject";
import { IChoice } from "interfaces/create-problem.interface";


export const examPNGProblemsState = atom<PNGUploadProblemFeature[]>({
    key: 'exam/photos/png',
    default: []
})

// 이미지 읽어와서 문제 생성
export const useReadImages = () => {
    const setPhotos = useSetRecoilState(examPNGProblemsState)
    const readImages = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {target: {files: fileList}} = event;
        if(!fileList)
            return;
        if(fileList.length!==4){
            alert('총 4장의 모의고사 시험지 png 파일이 필요합니다!')
            return;
        }

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
                        const problems:PNGUploadProblemFeature[] = EXAM_ROUTINES
                            .filter(({page}) => page === pageNo)
                            .map(({page, index, ...crop_props}) => ({
                                index,
                                photo: {
                                    url,
                                    crop: {
                                        unit: "%",
                                        ...crop_props
                                    },
                                    width,
                                    height
                                },
                                description: "",
                                correct_rate: 0,
                                unit: {unitIndex: 0},
                                choices: [],
                            }))
                        return prev.concat(problems).sort((a, b) => a.index - b.index)
                    });
                }
            };
            reader.readAsDataURL(file)
        })
    }
    return readImages
}

export const useSetCrop = () => {
    const setProblem = useSetRecoilState(examPNGProblemsState)
    const crop = (index: number, crop:Crop) => {
        setProblem(
            produce(draft => {
                draft[index].photo.crop=crop;
            })
        )
    }
    return crop
}

export const useSetUnitinfo = () => {
    const setProblem = useSetRecoilState(examPNGProblemsState)
    const getUnitInfo = useGetunit()
    const setUnitinfo = (problem_index: number, unit_index: number) => {
        const unitInfo = getUnitInfo(unit_index)
        setProblem(
            produce(draft => {
                draft[problem_index].unit=unitInfo;
            })
        )
    }
    return setUnitinfo
}

interface SetProblemProps {
    description?: string
    correct_rate?: number
}

export const useSetProblem = () => {
    const _setProblem = useSetRecoilState(examPNGProblemsState)
    const setProblem = (problem_index: number, newData:SetProblemProps) => {
        _setProblem(
            produce(draft => {
                draft[problem_index] = {...draft[problem_index], ...newData}
            })
        )
    }

    const getSetters = useCallback((problem_index: number) => {
        const setDescription = ({target:{value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
                setProblem(problem_index, {description: value})
        const setCorrectRate = (rate:number) => 
                setProblem(problem_index, {correct_rate: rate})
        return {
            setDescription,
            setCorrectRate,
        }
    },[])
    return getSetters
}

const KOR = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ"]
export const useResetChoices = () => {
    const setProblem = useSetRecoilState(examPNGProblemsState)
    const resetUnitinfo = (problem_index: number, isKor: boolean) => {
        const newChoices:IChoice[] = new Array(isKor ? 3 : 5)
            .fill(0)
            .map((_, i) => ({
                index: isKor ? KOR[i] : i+1+"",
                question: "",
                answer: true,
                solution: "",
                description: ""
            }))
        setProblem(
            produce(draft => {
                draft[problem_index].choices = newChoices;
            })
        )
    }
    return resetUnitinfo
}

export const useSetChoices = () => {
    const _setProblem = useSetRecoilState(examPNGProblemsState)
    const _setChoices = (problem_index: number, choice_index: string, newChoices:Partial<IChoice>) => {
        _setProblem(
            produce(draft => {
                const chIdx = draft[problem_index].choices.findIndex(ch => ch.index === choice_index)
                if(chIdx === -1)
                    return;
                const ch = draft[problem_index].choices[chIdx]
                draft[problem_index].choices[chIdx] = {...ch, ...newChoices}
            })
        )
    }

    const getSetters = useCallback((problem_index: number) => {
        const setQuestion = (choice_index: string) =>
             ({target:{value}}: ChangeEvent<HTMLInputElement>) => 
                _setChoices(problem_index, choice_index, {question: value})
        const setAnswer = (choice_index: string) => (answer: boolean) => 
                _setChoices(problem_index, choice_index, {answer})
        const setSolution = (choice_index: string) =>
             ({target:{value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
                _setChoices(problem_index, choice_index, {solution: value})
        const setImage = (choice_index: string) =>
             ({target:{value}}: ChangeEvent<HTMLInputElement>) => 
                _setChoices(problem_index, choice_index, {image: value})
        const setDescription = (choice_index: string) =>
             ({target:{value}}: ChangeEvent<HTMLInputElement>) => 
                _setChoices(problem_index, choice_index, {description: value})
        return {
            setQuestion,
            setAnswer,
            setSolution,
            setImage,
            setDescription
        }
    },[])
    return getSetters
}