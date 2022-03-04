import { ProblemCountBySubjectProps } from "interfaces/problem-count.interface"
import { requestAPI } from "./config"

export const getProblemCountsBySubject = () => {
    return requestAPI().get<ProblemCountBySubjectProps[]>('admin/overview/subjects')
}