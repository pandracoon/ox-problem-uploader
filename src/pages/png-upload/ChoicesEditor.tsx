import { Input, Switch, Tag } from "antd"
import { examPNGProblemsState, useResetChoices, useSetChoices } from "atoms/pngPhotos"
import { Box, Text } from "materials"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

interface ChoicesEditorProps {
    index: number
    isKor: boolean
}

export const ChoicesEditor = ({index:problem_index, isKor}:ChoicesEditorProps) => {
    const {choices} = useRecoilValue(examPNGProblemsState)[problem_index]
    const resetChoices = useResetChoices()
    const getSetter = useSetChoices()
    const {
        setQuestion,
        setAnswer,
        setSolution,
        setImage,
        setDescription
    } = getSetter(problem_index)


    useEffect(() => {
        resetChoices(problem_index, isKor)
    },[isKor])
    return (
        <Box flexDirection="column" flex={1}>
            {choices.map(({index, question, answer, solution, description}, i) => (
                <Box flexDirection="column" key={i} marginTop={6}>
                    <Box alignItems="center">
                        <Tag
                            color="geekblue"
                            children={index+"."}
                        />
                        <Input
                            placeholder="선지 내용"
                            value={question}
                            onChange={setQuestion(index)}
                        />
                        <Text 
                            type="P2"
                            align="right"
                            content="정답:"
                            style={{width: 42}}
                            marginHorizontal={12}
                        />
                        <Switch 
                            checkedChildren="O"
                            unCheckedChildren="X"
                            checked={answer}
                            onChange={setAnswer(index)}
                        />
                    </Box>
                    
                    <Box marginTop={8}>
                        <Input.TextArea
                            placeholder="정답 해설"
                            autoSize={{ minRows: 2, maxRows: 2 }}
                            value={solution}
                            onChange={setSolution(index)}
                        />
                    </Box>

                    <Box marginTop={8} alignItems="center">
                        <Input
                            placeholder="자료 해설(빈칸으로 두면 문제와 동일)"
                            value={description}
                            onChange={setDescription(index)}
                        />
                    </Box>

                </Box>
            ))}
        </Box>
    )
}