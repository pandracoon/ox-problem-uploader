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

    // 자료 설명
    description?: string
    
    // 정답률
    correct_rate: number

    // 사진파일 url
    image?: string

    // 소단원 id
    unitId: number


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
}