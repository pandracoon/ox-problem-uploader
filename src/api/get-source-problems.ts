import { IProblem } from "interfaces/problem-interface"
import { requestAPI } from "./config"

export const getSourceProblems = (subjectCode: string, sourceId: number) => {
    return requestAPI().get<IProblem[]>(`admin/overview/${subjectCode}/source/${sourceId}`)
}