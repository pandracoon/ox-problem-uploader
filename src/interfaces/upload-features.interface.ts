export interface UploadFeatures {
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

 // 대단원
    chapter: string

 // 소단원
    unit: string

 //  선지	
    no: string

 // 문제
    question: string
    
 // 정답
    answer: boolean
 
// 정답
    answer_ratio: number

// 해설
    solution: string

 // 사진파일명
    filename: string
}