import { ISubject } from "./subject.interface";

export interface ISource {
    year: number
    month: number,
    org: string, 
    source: string,
    alias: string,
    subject: ISubject
}