import { IExamRoutine } from "interfaces/exam-routine.interface";

const EXAM_ROUTINES_4:IExamRoutine[] = [
    {
        x: 9.5,
        y: 13,
        width: 40,
        height: 40,
    },
    {
        x: 9.5,
        y: 50,
        width: 40,
        height: 40.7,
    },
    {
        x: 50.9,
        y: 13,
        width: 40,
        height: 40,
    },
    {
        x: 50.9,
        y: 50,
        width: 40,
        height: 40.7,
    },
]

const EXAM_ROUTINES_5:IExamRoutine[] = [
    {
        x: 9.5,
        y: 21.15,
        width: 40,
        height: 26,
    },
    {
        x: 9.5,
        y: 42,
        width: 40,
        height: 26,
    },
    {
        x: 9.5,
        y: 65,
        width: 40,
        height: 25.7,
    },
    {
        x: 50.9,
        y: 13,
        width: 40,
        height: 40,
    },
    {
        x: 50.9,
        y: 50,
        width: 40,
        height: 40.7,
    },
]

const EXAM_ROUTINES_6:IExamRoutine[] = [
    {
        x: 9.5,
        y: 21.15,
        width: 40,
        height: 26,
    },
    {
        x: 9.5,
        y: 42,
        width: 40,
        height: 26,
    },
    {
        x: 9.5,
        y: 65,
        width: 40,
        height: 25.7,
    },
    {
        x: 50.9,
        y: 21.15,
        width: 40,
        height: 26,
    },
    {
        x: 50.9,
        y: 38,
        width: 40,
        height: 28,
    },
    {
        x: 50.9,
        y: 60,
        width: 40,
        height: 30.7,
    },
]
const EXAM_ROUTINES_7:IExamRoutine[] = [
    {
        x: 9.5,
        y: 21.15,
        width: 40,
        height: 26,
    },
    {
        x: 9.5,
        y: 35,
        width: 40,
        height: 26,
    },
    {
        x: 9.5,
        y: 50,
        width: 40,
        height: 25,
    },
    {
        x: 9.5,
        y: 65,
        width: 40,
        height: 25.7,
    },
    {
        x: 50.9,
        y: 21.15,
        width: 40,
        height: 26,
    },
    {
        x: 50.9,
        y: 38,
        width: 40,
        height: 28,
    },
    {
        x: 50.9,
        y: 60,
        width: 40,
        height: 30.7,
    },
]

interface IRoutines {
    [key: string]: IExamRoutine[]
}
export const EXAM_ROUTINES:IRoutines = {
    4: EXAM_ROUTINES_4,
    5: EXAM_ROUTINES_5,
    6: EXAM_ROUTINES_6,
    7: EXAM_ROUTINES_7,
}