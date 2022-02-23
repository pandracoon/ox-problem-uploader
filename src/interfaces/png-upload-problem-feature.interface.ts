import { IChoice } from "./create-problem.interface";
import { IPhoto } from "./photo.interface";
import { IUnitInfo } from "./subject.interface";

export interface PNGUploadChoice extends Omit<Omit<IChoice, "image">,"unitId"> {
    photo?: IPhoto
    // 소단원
    unit: IUnitInfo
}

export interface PNGUploadProblemFeature {
    useImage: boolean
    index: number
    photo: IPhoto
    
    // 자료설명
    description: string
     
    // 정답률
    correct_rate: number
    
    //  선지
    choices: PNGUploadChoice[]
}