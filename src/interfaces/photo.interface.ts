import { Crop } from 'react-image-crop'

export interface Photo {
    url:string
    crop: Crop
    width: number
    height: number
}