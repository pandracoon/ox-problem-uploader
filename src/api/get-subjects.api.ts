import { ISubject } from "interfaces/subject.interface"
import { requestAPI } from "./config"

export const getSubjectsApi = () => {
    return requestAPI().get<ISubject[]>('subjects')
}