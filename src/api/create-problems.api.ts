import { CreateProblemOutput, CreateProblemInput } from "interfaces/create-problem.interface"
import { requestAPI } from "./config"

export const createProblemsApi = (problems:CreateProblemInput[]) => {
    return requestAPI().post<CreateProblemOutput>('problem', {problems})
}