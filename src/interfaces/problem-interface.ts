import { IChoice } from "./create-problem.interface";

export interface IProblem {
    id:	number
    createdAt:	string
    updatedAt:	string
    number:	string
    correct_rate:	number
    score:	number
    solution:	string
    image:	string
    choices: IChoice[]
}