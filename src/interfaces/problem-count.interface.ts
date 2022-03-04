import { ISource } from "./source.interface";
import { ISubject } from "./subject.interface";

export interface ProblemCountBySubjectProps extends ISubject {
    problemCount: number
}
export interface ProblemCountBySourceProps extends ISource {
    id: number
    problemCount: number
}