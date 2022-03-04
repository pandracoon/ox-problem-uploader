import { ProblemCountBySourceProps } from "interfaces/problem-count.interface"
import { requestAPI } from "./config"

export const getProblemCountsBySource = (code:string) => {
    return requestAPI().get<ProblemCountBySourceProps[]>(`admin/overview/${code}/sources`)
}