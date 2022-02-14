import { ISubjectWithChapters } from "interfaces/subject.interface";
import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { defaultSubject } from "./defaultSubject";

const { persistAtom } = recoilPersist()


export const currentSubjectState = atom<ISubjectWithChapters>({
    key: 'subjects/name',
    default: defaultSubject,
    effects_UNSTABLE: [persistAtom],
})

interface IUnitInfo {
    chapter: string
    chapterId: number
    unit: string
    unitId: number
}
// 소단원 숫자를 통해 단원 전체 정보 얻음
export const useGetunit = (index: number):IUnitInfo | null => {
    const {chapters} = useRecoilValue(currentSubjectState)
    const targetChapter = chapters.find(ch => ch.units.findIndex(u => +u.index === +index) > -1)
    if(!targetChapter)
        return null;
        
    const unitInfo =  targetChapter.units.find(u => +u.index === +index)
    if(!unitInfo)
        return null;

    return {
        chapter: targetChapter.title,
        chapterId: targetChapter.id,
        unit: unitInfo.title,
        unitId: unitInfo.id
    }
}