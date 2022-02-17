import { IChoice } from "./create-problem.interface";
import { IPhoto } from "./photo.interface";
import { IUnitInfo } from "./subject.interface";

export interface PNGUploadProblemFeature {
    index: number
    photo: IPhoto
    // 소단원
    unit: IUnitInfo
    
    // 자료설명
    description: string
     
    // 정답률
    correct_rate: number
    
    //  선지
    choices: IChoice[]
}