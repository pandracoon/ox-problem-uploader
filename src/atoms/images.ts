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

export const useAddImageUrlMap = () => {
    const setImageUrls = useSetRecoilState(imageUrlsState)
    const addImageUrlMap = (name: string, url: string) => setImageUrls(prev => {
        if(prev.findIndex(item => item.name === name) > -1)
            return prev;
        else 
            return [...prev, {name, url}]
        
    })
    return addImageUrlMap
}
