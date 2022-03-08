import { ISubjectWithChapters } from "interfaces/subject.interface"
import { requestAPI } from "./config"

export const getChaptersApi = (code: string) => {
    return requestAPI().get<ISubjectWithChapters>(`subjects/${code}/chapters`)
}