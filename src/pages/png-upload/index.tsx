
import React, { useEffect, useMemo, useState } from "react"
import { Button, InputNumber, Select } from "antd"
import { Box, Text } from "materials"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { examPNGProblemsState } from "atoms/pngPhotos"
import { ProblemPreview } from "./ProblemPreview"
import { exams, IExam } from "data/exams"
import useLocalStorage from "utils/useLocalStorage"
import { currentSubjectState, problemSelector, subjectsListState, useAddImageUrlMap } from "atoms"
import { getSubjectsApi } from "api/get-subjects.api"
import { getChaptersApi } from "api/get-chapters.api"
import { UploadFeatures, ChoiceUploadFeatures } from "interfaces/upload-features.interface"
import { getCroppedImg } from "utils/getCroppedImg"
import { PNGUploadModal } from "./PNGUploadModal"
import { s3UploadFile } from "api/s3/\bs3uploadFile"

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
    const problems = useRecoilValue(examPNGProblemsState)
    const resetProblems = useResetRecoilState(examPNGProblemsState)
    const year_now = useMemo(() => new Date().getFullYear()+1, [])
    const [year, setYear] = useLocalStorage<number>('current/selected/year', 0)
    const [exam, setExam] = useLocalStorage<IExam>('current/selected/exam',exams[0])

    
    const [subjectsList, setSubjectsList] = useRecoilState(subjectsListState)
    const [currentSubject, setSubject] = useRecoilState(currentSubjectState)

    // 메인 화면에 문제를 업로드 하는 함수
    const appendProblems = useSetRecoilState(problemSelector);
    // 이미지 이름 - src 매핑
    const addImageUrlMap = useAddImageUrlMap()


    // 시험지 업로드 모달 제어
    const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
    const openUploadModal = () => setUploadModalVisible(true)
    const cancelUploadModal = () => setUploadModalVisible(false)


    // subject 목록 받아오기
    useEffect(() => {
        getSubjectsApi()
            .then(res => setSubjectsList(res.data))
    },[setSubjectsList])
    const selectSubject = (code: string) => {
        getChaptersApi(code)
            .then(res =>{
                setSubject(res.data)
            })
    }
    const selectExam = (alias: string) => {
        setExam(prev => exams.find(ex => ex.alias===alias) || prev)
    }

    const navigate = useNavigate()
    const toHome = () => navigate('/')
    const toConvertPDF2PNG = () => window.open('https://pdf2png.com/ko/')

    const resetAllProblems = () => {
        const ok = window.confirm('모든 문제를 삭제하시겠습니까?')
        if(!ok)
            return;
        resetProblems()
    }

    const onReadyUpload = async () => {
        if(!year)
            alert('연도와 시험 종류를 확인해 주세요.')
        const ok = window.confirm('모든 문제를 등록하시겠습니까?')
        if(!ok)
            return;

        const result_problems:UploadFeatures[] = await Promise.all(
            // photo: 문제 이미지
            // 문제 이미지를 url로 변환 -> S3에 등록 -> 이미지 이름 - 파일url 매핑에 추가
            problems.map(async ({useImage, index, photo, solution, correct_rate, choices, score}) => {
                const {alias, ...examInfo} = exam

                // filename은 table row의 key로도 사용됨
                const filename = `${year}/${alias.split(' ').join('_')}_${currentSubject.name}_no${index}`

                if(useImage){
                    const {url:base64} = await getCroppedImg(photo)
                    const url = await s3UploadFile(base64, currentSubject.code, filename)
                    // filename - url 맵에 추가
                    addImageUrlMap(filename, url)
                }

                // 문제 내 모든 선지에 대해 이미지를 url로 변환 -> S3에 등록 -> 이미지 이름 - 파일url 매핑에 추가
                const choices_with_filename:ChoiceUploadFeatures[] = await Promise.all(
                    choices.map(async ({photo, ...rest}) => {
                        if(!useImage || !photo) 
                            return rest;
                        const {url:base64} = await getCroppedImg(photo)
                        const filename_forChoice = `${filename}_${rest.index}`
                        const url = await s3UploadFile(base64, currentSubject.code, filename_forChoice)
                        addImageUrlMap(filename_forChoice, url)

                        return {
                            filename:filename_forChoice, 
                            ...rest
                        }
                    })
                )
                
                return {
                    key: filename,
                    isExam: true,
                    year,
                    ...examInfo,
                    number: index+"",
                    correct_rate,
                    solution,
                    score,
                    filename: useImage ? filename : "",
                    choices: choices_with_filename
                }
            })
        )

        // 문제 추가
        appendProblems(result_problems)
        resetProblems()
        toHome()
    }

    return (
        <Wrapper>

            {/* Header */}
            <Box 
                justifyContent="space-between" 
                alignItems="center"
                marginBottom={24} 
                marginLeft={50}
            >
                <Text type="H1" content="PNG로 추가하기" marginRight={18} />

                <Box alignItems="center">
                    {problems.length === 0 ? (
                        <Button type="primary" onClick={openUploadModal} style={{marginRight:12}}>
                            시험지 PNG 업로드하기
                        </Button>
                    ) : (
                        <Button type="ghost" danger onClick={resetAllProblems}>
                            전체 문제 삭제
                        </Button>
                    )}

                    <Button type="link" onClick={toConvertPDF2PNG}>
                        PDF→PNG 변환하기
                    </Button>
                </Box>
            </Box>
            {/* Header Finish */}

            <Box justifyContent="space-between" alignItems="center">
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
                            value={exam.alias}
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
                            value={currentSubject.code} 
                            style={{ width: 120 }} 
                            onChange={selectSubject}>
                            {subjectsList.map((s) => (
                                <Option value={s.code} children={s.name} key={s.code} />
                            ))}
                        </Select>
                    </Box>
                </Box>


                <Button 
                    type="primary" 
                    onClick={onReadyUpload}
                    disabled={problems.length===0}
                >
                    메인 화면에 문제 업로드 
                </Button>
            </Box>
            {/* 과목 선택 finish */}

            <GridBox>
                {problems.map((_, idx) => (
                    <ProblemPreview index={idx} source={{year, ...exam}} key={idx} />
                ))}
            </GridBox>

            <PNGUploadModal
                year={year}
                setYear={setYear}
                exam={exam}
                selectExam={selectExam}
                selectSubject={selectSubject}

                visible={uploadModalVisible}    
                onCancel={cancelUploadModal}
            />
        </Wrapper>
    )
}