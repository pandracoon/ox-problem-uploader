import { atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    storage: sessionStorage,
})

interface ImageNameUrl {
    name: string
    url: string
}

export const imageUrlsState = atom<ImageNameUrl[]>({
    default: [],
    key: 'images/urls',
    effects_UNSTABLE: [ persistAtom ],
})

export const useAddImageUrlMap = (name: string, url: string) => {
    const setImageUrls = useSetRecoilState(imageUrlsState)
    setImageUrls(prev => {
        if(prev.findIndex(item => item.name === name) > -1)
            return prev;
        else 
            return [...prev, {name, url}]
        
    })
}
