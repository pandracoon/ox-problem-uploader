import { Tag } from "antd"
import { IProblem } from "interfaces/problem-interface"
import { useCallback } from "react"

interface ProblemTagProps {
    no: number
    problem?: IProblem 
    onClick: (problem: IProblem | null) => void
}
export const ProblemTag = ({no, problem, onClick}:ProblemTagProps) => {
    const onTagClick = useCallback(() => onClick(problem || null), [problem])
    return (
        <Tag 
            onClick={onTagClick}
            color={problem ? "blue" : "red"}
            key={no}
            children={no} 
            style={{
                cursor: problem ? 'pointer' : 'default',
                width: 72, 
                padding: '8px 0', 
                textAlign: "center",
                marginRight: 18
            }} 
        />
    )
}