import { CreateProblemOutput, CreateProblemInput } from "interfaces/create-problem.interface"
import { requestAPI } from "./config"

export const createProblemsApi = (subjectCode:string, problems:CreateProblemInput[]) => {
    return requestAPI().post<CreateProblemOutput>('choices', {
        subjectCode,
        problems
    })
}