
export interface IUnit {
    index: number,
    chapter: string,
    unit: string
}

export const subjectName = ['물리학1', '화학1', '생명과학1', '지구과학1'] as const;
export type SubjectNameType = typeof subjectName[number];

export const subject_code = ["PHY-1", "PHY-2", "CHE-1", "CHE-2", "BIO-1", "BIO-2", "EAR-1", "EAR-2"] as const
export type SubjectCodeType = typeof subject_code[number];

export interface ISubject {
    code: SubjectCodeType
    name: SubjectNameType
    units: IUnit[]
}