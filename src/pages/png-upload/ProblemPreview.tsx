import { Input, InputNumber, Select, Switch } from "antd"
import { currentSubjectState } from "atoms"
import { examPNGProblemsState, useSetProblem, useSetUnitinfo } from "atoms/pngPhotos"
import { ISource } from "interfaces/source.interface"
import { Box, Text } from "materials"
import { useCallback, useMemo, useState } from "react"
import { useRecoilValue } from "recoil"
import { ChoicesEditor } from "./ChoicesEditor"
import { ImageWithCropper } from "./ImageWithCropper"

const { Option } = Select;

interface ProblemPreviewProps {
    index: number
    source: Omit<ISource, 'subject'>
}

export const ProblemPreview = ({index, source:{year, alias}}:ProblemPreviewProps) => {
    const {index:problem_real_index, description, correct_rate} = useRecoilValue(examPNGProblemsState)[index]
    const currentSubject = useRecoilValue(currentSubjectState)
    const intro = useMemo(() => `${year} ${alias} ${currentSubject.name}, ${problem_real_index}번`,[year])
    
    // unit select
    const _setUnitinfo = useSetUnitinfo()
    const setUnitinfo = useCallback((unit_index:number) => _setUnitinfo(index, unit_index),[])
    
    const units = useMemo(() => currentSubject.chapters.map(ch => ch.units).flat(), [currentSubject.code])

    // 선지 종류
    const [isKor, setIsKor] = useState<boolean>(true)

    // set problem
    const setProblemGetter = useSetProblem()
    const {setDescription, setCorrectRate} = setProblemGetter(index)


    return (
        <Box>
             <Box flexDirection="column" justifyContent="center" >
                <Text type="D2" align="center" content="[자료 이미지]" marginBottom={4} /> 
                <ImageWithCropper index={index} />
            </Box>

            <Box flexDirection="column" paddingHorizontal={32} paddingVertical={16} flex={1}>
                <Text bold type="P1" content={intro} marginBottom={14} /> 
                <Box alignItems="center" justifyContent="space-between">
                    {/* 단원 선택 */}
                    <Box alignItems="center">
                        <Text type="P1" content="소단원" marginRight={6} marginBottom={4} /> 
                        <Select
                            showSearch
                            filterOption={(input, option) => option?.includes(input)}
                            onChange={setUnitinfo}
                            placeholder="단원을 선택해주세요."
                            style={{width: 200}}
                        >
                            {units.map((unit) => (
                                <Option value={unit.index} children={unit.title} key={unit.id} />
                            ))}
                        </Select>
                    </Box>
                    
                    {/* 정답률 */}
                    <Box alignItems="center">
                        <Text type="P1" content="정답률" marginRight={5} marginBottom={4} />
                        <InputNumber 
                            placeholder="정답률"
                            formatter={value => `${value}%`}
                            value={correct_rate}
                            onChange={setCorrectRate}
                            min={0}
                            max={100}
                        />
                    </Box>

                    {/* 선지 종류(한글/숫자) 설정 */}
                    <Box alignItems="center">
                        <Text type="P1" content="선지 종류" marginRight={5} marginBottom={4} />
                        <Switch 
                            checkedChildren="ㄱㄴㄷ" 
                            unCheckedChildren="12345" 
                            defaultChecked 
                            onChange={setIsKor}
                        />
                    </Box>
                </Box>
                
                <Box marginTop={8}>
                    <Input.TextArea
                        placeholder="자료 해설"
                        value={description}
                        onChange={setDescription}
                    />
                </Box>
               

            </Box>
            
            <ChoicesEditor 
                index={index}
                isKor={isKor}
            />

        </Box>
    )
}