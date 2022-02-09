import { subjectsData } from "data/units";
import { SubjectNameType } from "interfaces/subject.interface";
import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const subjectState = atom<SubjectNameType>({
    key: 'subjects/name',
    default: '생명과학1',
    effects_UNSTABLE: [persistAtom],
})

// 소단원 숫자를 통해 단원 전체 정보 얻음
export const useGetunit = (index: number) => {
    const currentSubject = useRecoilValue(subjectState)
    const unitInfo = subjectsData
                        .find(s => s.name===currentSubject)?.units
                        .find(u => u.index===index)
    return unitInfo
}

// 소단원 숫자를 통해 단원 전체 정보 얻음
export const useGetSubjectCode = () => {
    const currentSubject = useRecoilValue(subjectState)
    const code = subjectsData.find(s => s.name===currentSubject)?.code
    return code
}