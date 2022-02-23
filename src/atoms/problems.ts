import { recoilPersist } from 'recoil-persist'
import { UploadFeatures } from "interfaces/upload-features.interface";
import { atom, DefaultValue, selector } from "recoil";

const { persistAtom } = recoilPersist({
    storage: sessionStorage
})


export const problemsState = atom<UploadFeatures[]>({
    default: [],
    key: 'problems',
    effects_UNSTABLE: [ persistAtom ],
})



export const problemSelector = selector<UploadFeatures[]>({
    key: 'problems/selector',
    get: ({ get }) => {
        const problems = get(problemsState);
        return problems;
    },
    set: ({get, set}, newValues)=> {
        const problems = get(problemsState);
        set(
            problemsState, 
            // reset 시 초기화
            // 추가 시 뒤에 붙임
            newValues instanceof DefaultValue ?
                newValues
                :
                problems.concat(newValues)
        )
    }
})
