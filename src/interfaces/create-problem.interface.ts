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

    // 선지
    // ex) ㄱ, 1
    no: string

    // 문제
    question: string
    
    // 정답
    answer: boolean

    // 해설
    solution: string

    // 사진파일 url
    image: string

    // 소단원 id
    unitId: number
}

export interface CreateProblemOutput {
    succeed: number
    fail: number
}