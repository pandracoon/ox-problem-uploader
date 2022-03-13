import { IProblem } from "interfaces/problem-interface"
import { Box, Text } from "materials"
import { Image } from "antd"

interface ChoiceViewProps {
    problem: IProblem
    choiceIndex: string
}
export const ChoiceView = ({problem, choiceIndex}:ChoiceViewProps) => {
    const choice = problem.choices.find(ch => ch.index === choiceIndex)
    if(!choice)
        return null
    return (
        <Box flexDirection="column" marginTop={18}>
            <Text 
                content={`${problem.number}. ${choice.description || "(자료 설명 없음)"}`} 
                marginBottom={12} 
            />
            <Image 
                src={choice.image || problem.image}
                width={400}
            />

            <Text 
                type="P1"
                bold
                content="선지"
                marginTop={12}
            />
            <Text 
                content={`${choice.question}`} 
                marginVertical={12} 
            />

            <Text 
                type="P1"
                bold
                content="정답"
                marginTop={12}
            />
            <Text 
                content={choice.answer ? "O" : "X"} 
                marginVertical={12} 
            />

            <Text 
                type="P1"
                bold
                content="해설(공통)"
                marginTop={12}
            />
            <Text 
                content={problem.solution || "(없음)"} 
                marginVertical={12} 
            />

            <Text 
                type="P1"
                bold
                content="해설(선지)"
                marginTop={12}
            />
            <Text 
                content={choice.solution || "(없음)"} 
                marginVertical={12} 
            />
        </Box>
    )
}