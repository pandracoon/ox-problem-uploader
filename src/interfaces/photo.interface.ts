import { Crop } from 'react-image-crop'

export interface IPhoto {
    url:string
    crop: Crop
    width: number
    height: number
}
