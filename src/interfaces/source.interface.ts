import { ISubject } from "./subject.interface";

export interface ISource {
    year: number
    month: number,
    org: string, 
    source: string
    alias: string
    
    subject: ISubject
}

export const sourceToAlias = (source:ISource) => `${source.year}년 ${source.month}월 ${source.org}`