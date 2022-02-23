import { IChoice } from "./create-problem.interface";
import { IUnitInfo } from "./subject.interface";

export interface ChoiceUploadFeatures extends Omit<Omit<IChoice, "image">, "unitId"> {
   filename?: string
   // 소단원
   unit: IUnitInfo
}

// 서버에 전송하기 전 유저가 보는 데이터
export interface UploadFeatures {
   key: string

 // 시험여부
   isExam: boolean
    
 // 발행연도
   year: number

 // 월 
   month: number

 // 출처명
   source: string

 // 출제기관
   org: string
    
 // 번호
   number: string
    
 // 자료설명
   description: string
 
// 정답률
   correct_rate: number

 // 사진파일명
   filename: string

 //  선지
   choices: ChoiceUploadFeatures[]
}