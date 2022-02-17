import React, { useEffect, useState } from "react"
import { Box, Text } from "materials"
import styled from "styled-components"
import { Button, Select, Table, Tag } from "antd"
import { columns } from './table-config'
import { UploadFeatures } from "interfaces/upload-features.interface"
import ProblemCsvReader from "./problem-uploader"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { currentSubjectState, imageUrlsState, problemSelector, problemsState, useGetunit } from "atoms"
import { ImageUploader } from "./image-uploaders/multi-image-uploader"
import { AiOutlineCaretRight } from "react-icons/ai"
import { DownloadOutlined } from '@ant-design/icons';
import { ISubject } from "interfaces/subject.interface"
import { getSubjectsApi } from "api/get-subjects.api"
import { getChaptersApi } from "api/get-chapters.api"
import { createProblemsApi } from "api/create-problems.api"
import { CreateProblemInput } from "interfaces/create-problem.interface"
import produce from "immer"
import { useNavigate } from "react-router-dom"


const { Option } = Select;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 60px;
`
const Gapbox = styled.div`
    display: flex;
    align-items: center;
    * {
        margin: 0 6px;
    }
`

export function Home(){
    const setProblems = useSetRecoilState(problemsState)
    const [subjectsList, setSubjectsList] = useState<Omit<ISubject, 'chapters'>[]>([])
    const [currentSubject, setSubject] = useRecoilState(currentSubjectState)
    const getUnitInfo = useGetunit()
    const navigate = useNavigate()
    
    // subject 목록 받아오기
    useEffect(() => {
        getSubjectsApi()
            .then(res => setSubjectsList(res.data))
    },[])

    const selectSubject = (code: string) => {
        getChaptersApi(code)
            .then(res => {setSubject(res.data)})
    }
    
    useEffect(() => {
        // 선택 과목 변경 시 문제 대단원, 소단원 정보 최신화
        setProblems( 
            produce(
                (draft) => {
                for (const problem of draft) {
                    const unitInfo = getUnitInfo(problem.unit.unitIndex)
                    problem.unit=unitInfo                       
                }
            })
        )
            
    }, [currentSubject.code])

    // 문제 휴지통
    const [bin, setBin] = useState<UploadFeatures[]>([])
    const [problems, appendProblems] = useRecoilState(problemSelector)
    const resetProblems = useResetRecoilState(problemSelector);
    const imageUrls = useRecoilValue(imageUrlsState);
    const resetImageUrls = useResetRecoilState(imageUrlsState)


    const toPdf = () => navigate('/pdf')
    const onReset = () => {
        const ok = window.confirm("전체 문제를 삭제하시겠습니까?")
        if(!ok)
            return;
        setBin(problems)
        resetProblems()
    }

    const recover = ()  =>  {
        const ok = window.confirm(`문제 ${bin.length}개를 복원하시겠습니까?`)
        if(!ok)
            return;
        appendProblems(bin)
        setBin([])
    }

    const [isImageModalVisible, setIsImageModalVisible] = useState<boolean>(false)
    const closeModal = () => setIsImageModalVisible(false)
    const openModal = () => {
        if(!problems.length){
            alert('먼저 문제를 등록해주세요!')
            return;
        }
        const ok = window.confirm(`먼저 과목을 확인해주세요!\n"${currentSubject.name}" 과목을 등록하고 있나요?`)
        if(!ok)
            return;
        setIsImageModalVisible(true)
    }

    const downloadForm = () => window.open('./문제 업로드 양식.xlsx')

    const uploadProblems = () => {
        const candidates = problems.filter(problem => problem.unit.info)

        const ok = window.confirm(
            problems.length === candidates.length ?
            `${currentSubject.name} 과목 ${problems.length}개 문제를 등록하시겠습니까?`
            :
            `등록 불가능한 문제가 ${problems.length-candidates.length}개 있습니다. 나머지 ${candidates.length}개 문제를 등록하시겠습니까?`
        )
        if(!ok)
            return;

        const uploadedProblems:CreateProblemInput[] = candidates.map(
            ({key, unit, filename, ...problem}) => {
                if(!unit.info)
                    throw Error()
                const image = imageUrls.find(item => item.name === filename)?.url
                const { unitId } = unit.info
            return {
                unitId,
                image,
                ...problem
            }
        })
        createProblemsApi(uploadedProblems).then((res) => {
            alert(`등록 요청 수: ${candidates.length}, 등록 성공 수: ${res.data.succeed}, 등록 실패 수:${res.data.fail}`)
            resetProblems()
            resetImageUrls()
            window.location.reload()
        })
    }

    return (
        <Wrapper>
            <Box 
                justifyContent="space-between" 
                alignItems="center"
                marginBottom={24} 
            >
                <Box alignItems="center">
                    <Text type="H1" content="문제 업로드" marginRight={18} />
                    <Button type="link" >
                    {/* <Button type="link" onClick={toPdf}> */}
                        pdf로 추가하기(베타 버전)
                    </Button>
                </Box>
                <Gapbox>
                    <ProblemCsvReader />
                    <Button type="primary" danger onClick={onReset}>
                        문제 초기화
                    </Button>
                    <Button type="ghost" danger onClick={recover}>
                        문제 복원({bin.length})
                    </Button>
                    <Button type="primary" onClick={openModal}>
                        문제 사진 업로드
                    </Button>
                    <Button 
                        type="primary" 
                        style={{ 
                            backgroundColor: "#21DC6D", 
                            border: 'none', 
                            width:300,
                            fontSize: 16,
                        }}
                        onClick={uploadProblems}
                    >
                        전체 문제 및 사진 업로드
                    </Button>
                </Gapbox>
            </Box>

            <Box justifyContent="space-evenly">
                <div>
                    <Button 
                        type="primary" 
                        icon={<DownloadOutlined />}
                        onClick={downloadForm}
                    >
                        엑셀 양식 파일 다운로드
                    </Button>
                    <Text type="P1" size={20} bold underlined marginLeft={12} content=".csv" />
                    <Text type="P1" marginLeft={5} content="형식으로 변환 후 업로드 하세요!!" />
                </div>
                <Gapbox style={{marginBottom: 18, alignSelf: "center"}}>
                    <Text type="P1" bold content="과목 선택" />
                    <Select 
                        defaultValue={currentSubject.code} 
                        style={{ width: 120 }} 
                        onChange={selectSubject}>
                        {subjectsList.map((s) => (
                            <Option value={s.code} children={s.name} key={s.code} />
                        ))}
                    </Select>
                    <span style={{paddingRight:32}} />
                    <Tag color="warning" children="과목 선택" />
                    <AiOutlineCaretRight color="#ababab" />
                    <Tag color="error" children="csv 파일 업로드" />
                    <AiOutlineCaretRight color="#ababab" />
                    <Tag color="processing" children="이미지 업로드" />
                    <AiOutlineCaretRight color="#ababab" />
                    <Tag color="success" children="문제 최종 업로드" />
                </Gapbox>
            </Box>


            <Text 
                align="center" 
                type="H2" 
                content={currentSubject.name} 
                marginBottom={24}
                underlined
            />
            
            <Table<UploadFeatures>
                columns={columns} 
                dataSource={problems} 
            />

            <ImageUploader visible={isImageModalVisible} onOk={closeModal} onCancel={closeModal}/>
        </Wrapper>
    )
}