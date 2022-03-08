import { IUnitInfo } from "./subject.interface";

export interface CreateProblemInput {
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
    // 문제집은 페이지 포함
    number: string

    // 점수
    score: number

    // 공통 해설
    solution: string
    
    // 정답률
    correct_rate: number

    // 사진파일 url
    image?: string

    // 선지
    choices: IChoice[]
}

export interface CreateProblemOutput {
    succeed: number
    fail: number
}

export interface IChoice {
    index: string
    question: string
    answer: boolean
    solution: string
    image?: string
    description?: string
    // 서버 전송시에는 소단원 숫자만 전송
   unitId: number
}