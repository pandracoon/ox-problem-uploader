import React, { useEffect, useState } from "react"
import { Box, Text } from "materials"
import styled from "styled-components"
import { Button, Select, Table, Tag } from "antd"
import { columns } from './table-config'
import { UploadFeatures } from "interfaces/upload-features.interface"
import ProblemCsvReader from "./problem-uploader"
import { useRecoilState, useResetRecoilState } from "recoil"
import { currentSubjectState, problemSelector } from "atoms"
import { ImageUploader } from "./image-uploader"
import { AiOutlineCaretRight } from "react-icons/ai"
import { DownloadOutlined } from '@ant-design/icons';
import { ISubject } from "interfaces/subject.interface"
import { getSubjectsApi } from "api/get-subjects.api"
import { getChaptersApi } from "api/get-chapters.api"


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
    const [subjectsList, setSubjectsList] = useState<Omit<ISubject, 'chapters'>[]>([])
    const [currentSubject, setSubject] = useRecoilState(currentSubjectState)
    
    // subject 목록 받아오기
    useEffect(() => {
        getSubjectsApi()
            .then(res => setSubjectsList(res.data))
    },[])

    const selectSubject = (code: string) => {
        getChaptersApi(code)
            .then(res => setSubject(res.data))
    }

    // 문제 휴지통
    const [bin, setBin] = useState<UploadFeatures[]>([])
    const [problems, appendProblems] = useRecoilState(problemSelector)
    const resetProblems = useResetRecoilState(problemSelector);
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
        const ok = window.confirm(`먼저 과목을 확인해주세요!\n"${currentSubject}" 과목을 등록하고 있나요?`)
        if(!ok)
            return;
        setIsImageModalVisible(true)
    }

    const downloadForm = () => window.open('./문제 업로드 양식.xlsx')
    return (
        <Wrapper>
            <Box 
                justifyContent="space-between" 
                alignItems="center"
                marginBottom={24} 
            >
                <Text type="H1" content="문제 업로드" />
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
                    <Button type="primary" style={{ backgroundColor: "#52C41A", border: 'none' }}>
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