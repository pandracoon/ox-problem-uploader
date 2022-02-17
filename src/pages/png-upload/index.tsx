import React, { useEffect, useMemo } from "react"
import { Button, InputNumber, Select } from "antd"
import { Box, Text } from "materials"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { PNGUploader } from "./png-uploader"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { examPNGProblemsState } from "atoms/pngPhotos"
import { ProblemPreview } from "./ProblemPreview"
import { exams, IExam } from "data/exams"
import useLocalStorage from "utils/useLocalStorage"
import { currentSubjectState, subjectsListState } from "atoms"
import { getSubjectsApi } from "api/get-subjects.api"
import { getChaptersApi } from "api/get-chapters.api"

const { Option } = Select;


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 60px;
`

const GridBox = styled.div`
    display: grid;
    margin-top: 20px;
    gap: 20px;
`


export function PNGUpload(){
    const photos = useRecoilValue(examPNGProblemsState)
    const resetPhotos = useResetRecoilState(examPNGProblemsState)
    const year_now = useMemo(() => new Date().getFullYear()+1, [])
    const [year, setYear] = useLocalStorage<number>('current/selected/year',year_now)
    const [exam, setExam] = useLocalStorage<IExam>('current/selected/exam',exams[0])
    
    const [subjectsList, setSubjectsList] = useRecoilState(subjectsListState)
    const [currentSubject, setSubject] = useRecoilState(currentSubjectState)
    
    // subject 목록 받아오기
    useEffect(() => {
        getSubjectsApi()
            .then(res => setSubjectsList(res.data))
    },[])
    const selectSubject = (code: string) => {
        getChaptersApi(code)
            .then(res => {setSubject(res.data)})
    }
    const selectExam = (alias: string) => {
        setExam(prev => exams.find(ex => ex.alias===alias) || prev)
    }

    const navigate = useNavigate()
    const toHome = () => navigate('/')
    const toConvertPDF2PNG = () => window.open('https://pdf2png.com/ko/')



    return (
        <Wrapper>

            {/* Header */}
            <Box 
                justifyContent="space-between" 
                alignItems="center"
                marginBottom={24} 
            >
                <Box alignItems="center">
                    <Text type="H1" content="PNG로 추가하기" marginRight={18} />
                    <Button type="link" onClick={toHome}>
                        홈으로
                    </Button>
                </Box>

                <Box alignItems="center">
                    <PNGUploader />
                    <Button type="ghost" danger onClick={resetPhotos}>
                        파일 삭제
                    </Button>
                    <Button type="link" onClick={toConvertPDF2PNG}>
                        PDF→PNG 변환하기
                    </Button>
                </Box>
            </Box>
            {/* Header Finish */}

            {/* 과목 선택 */}
            <Box>
                <Box flexDirection="column">
                    <Text type="P1" align="center" content="연도" marginBottom={5} />
                    <InputNumber 
                        max={year_now} 
                        placeholder={""+year_now} 
                        value={year}  
                        onChange={setYear}
                    />
                </Box>
                <Box flexDirection="column" marginLeft={12}>
                    <Text type="P1" align="center" content="시험 종류" marginBottom={5} />
                    <Select 
                        defaultValue={exam.alias}
                        onChange={selectExam}
                        style={{width: 200}}
                    >
                        {exams.map((ex) => (
                            <Option value={ex.alias} children={ex.alias} key={ex.alias} />
                        ))}
                    </Select>
                </Box>
                <Box flexDirection="column" marginLeft={12}>
                    <Text type="P1" align="center" content="과목" marginBottom={5} />
                    <Select 
                        defaultValue={currentSubject.code} 
                        style={{ width: 120 }} 
                        onChange={selectSubject}>
                        {subjectsList.map((s) => (
                            <Option value={s.code} children={s.name} key={s.code} />
                        ))}
                    </Select>
                </Box>
            </Box>
            {/* 과목 선택 finish */}

            <GridBox>
                {photos.map((_, idx) => (
                    <ProblemPreview index={idx} source={{year, ...exam}} key={idx} />
                ))}
            </GridBox>
        </Wrapper>
    )
}