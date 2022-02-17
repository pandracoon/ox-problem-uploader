import { ISubject, ISubjectWithChapters, IUnitInfo } from "interfaces/subject.interface";
import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { defaultSubject } from "./defaultSubject";

const { persistAtom } = recoilPersist()

export const subjectsListState = atom<Omit<ISubject, 'chapters'>[]>({
    key: 'subjects/list',
    default: [defaultSubject]
})

export const currentSubjectState = atom<ISubjectWithChapters>({
    key: 'subjects/current',
    default: defaultSubject,
    effects_UNSTABLE: [persistAtom],
})

// 소단원 숫자를 통해 단원 전체 정보 얻음
export const useGetunit = () => {
    const {chapters} = useRecoilValue(currentSubjectState)
    const getter = (index: number):IUnitInfo => {
        const targetChapter = chapters.find(ch => ch.units.findIndex(u => +u.index === +index) > -1)
        if(!targetChapter)
            return { unitIndex: index };
            
        const unitInfo =  targetChapter.units.find(u => +u.index === +index)
        if(!unitInfo)
            return { unitIndex: index };
        
        return {
            info: {
                chapter: targetChapter.title,
                chapterId: targetChapter.id,
                unit: unitInfo.title,
                unitId: unitInfo.id,
            },
            unitIndex: index
        }
    }
    return getter
}