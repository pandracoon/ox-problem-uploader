import { Image } from "antd"
import { getSourceProblems } from "api/get-source-problems"
import { ProblemCountBySourceProps, ProblemCountBySubjectProps } from "interfaces/problem-count.interface"
import { IProblem } from "interfaces/problem-interface"
import { sourceToAlias } from "interfaces/source.interface"
import { Box, Text } from "materials"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { ProblemTag } from "./ProblemTag"
import { SubjectSourceMenu } from "./SubjectSourceMenu"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 0;
`

const EXAM_NO = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const cutoff = [5, 10, 15, 20]

export function Overview(){
    const [currentSubject, setCurrentSubject] = useState<ProblemCountBySubjectProps | null>(null)
    const [currentSource, setCurrentSource] = useState<ProblemCountBySourceProps | null>(null)
    
    // 현재 과목, 출처의 문제 목록
    const [problems, setProblems] =  useState<IProblem[]>([])
    // 현재 보고 있는 문제
    const [viewProblem, setViewProblem] = useState<IProblem | null>(null)
    
    const onSelectSource = (subject: ProblemCountBySubjectProps, source: ProblemCountBySourceProps) => {
        setCurrentSubject(subject)
        setCurrentSource(source)
    }

    useEffect(() => {
        if(currentSource && currentSubject)
            getSourceProblems(currentSubject.code, currentSource.id)
                .then(res => setProblems(res.data))

    }, [currentSource?.id, currentSubject?.code])

    
    
    return (
        <Wrapper>
            <Box 
                justifyContent="space-between" 
                alignItems="center"
                marginBottom={24} 
                paddingLeft={50}
                marginHorizontal={60}
            >
                <Text type="H1" content="문제 현황 보기" marginRight={18} />
            </Box>

            {/* Menu */}
            <Box>
                <SubjectSourceMenu onSelectSource={onSelectSource} />
                <Box flex={1} flexDirection="column" marginLeft={24}>
                    <Text 
                        type="H2"
                        align="center"
                        content={(currentSubject && currentSource) ? 
                            `${currentSubject.name} ${sourceToAlias(currentSource)} (총 ${currentSource.problemCount}문제)` 
                            : "출처를 선택해 주세요."} 
                    />
                    
                    {cutoff.map((cut, i, arr) => (
                        <Box key={cut} marginTop={20}>
                            {EXAM_NO.slice(arr[i-1] || 0,cut).map(no => (
                                <ProblemTag 
                                    onClick={setViewProblem}
                                    no={no}
                                    key={no} 
                                    problem={problems.find(i => i.number===no+"")}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>

                {/* 문제 상세 보기 */}
                <Box flex={1} flexDirection="column" marginRight={24}>
                    {viewProblem && (
                        <>
                        <Text 
                            content={`${viewProblem.number}. ${viewProblem.description}`} 
                            marginBottom={12} 
                        />
                        <Image 
                            src={viewProblem.image}
                            width={400}
                        />
                        <Text 
                            content={`${viewProblem.solution}`} 
                            marginBottom={12} 
                        />
                        </>
                    )}
                </Box>
            </Box>

        </Wrapper>
    )
}