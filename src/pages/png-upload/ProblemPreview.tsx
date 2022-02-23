import { Button, Divider, Input, InputNumber, Switch } from "antd"
import { currentSubjectState } from "atoms"
import { examPNGProblemsState, useRemoveProblem, useSetProblem, useSetUseImage } from "atoms/pngPhotos"
import { ISource } from "interfaces/source.interface"
import { Box, Text } from "materials"
import { ChangeEvent, useCallback, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { useRecoilValue } from "recoil"
import { gccTextDetection } from "utils/gcc-text-detection"
import { getCroppedImg } from "utils/getCroppedImg"
import { ChoicesEditor } from "./ChoicesEditor"
import { ImageWithCropper } from "./ImageWithCropper"

interface ProblemPreviewProps {
    index: number
    source: Omit<ISource, 'subject'>
}

export const ProblemPreview = ({index, source:{year, alias}}:ProblemPreviewProps) => {
    const {index:problem_real_index, description, correct_rate, photo, useImage} = useRecoilValue(examPNGProblemsState)[index]
    const currentSubject = useRecoilValue(currentSubjectState)
    const intro = `${year} ${alias} ${currentSubject.name}, ${problem_real_index}번`

    // remove problem
    const _removeProblem = useRemoveProblem()
    const onRemove = useCallback(() =>  _removeProblem(index),[index])
    
    const _setUseImage = useSetUseImage()
    const onChangeUseImage = useCallback((useImage: boolean) => _setUseImage(index, useImage), [index])

    // 선지 종류
    const [isKor, setIsKor] = useState<boolean>(true)

    // set problem
    const setProblemGetter = useSetProblem()
    const {setDescription, setCorrectRate} = setProblemGetter(index)

    const [detectedText, setDetectedText] = useState<string>("")
    const onTextDetection = async () => {
        const {url} = await getCroppedImg(photo)
        const text = await gccTextDetection(url)
        setDetectedText(text)
    }
    const onTextChange = ({target:{value}}:ChangeEvent<HTMLTextAreaElement>) => {
        setDetectedText(value)
    }

    return (
        <>
        <Box>
             <Box flexDirection="column" justifyContent="center" >
                <Text type="D2" align="center" content="[자료 이미지]" marginBottom={4} /> 
                <ImageWithCropper index={index} />
            </Box>

            <Box flexDirection="column" paddingHorizontal={32} paddingVertical={16} flex={1}>
                <Box alignItems="flex-end" justifyContent="space-between" marginBottom={14}>
                    <Text bold type="P1" content={intro} />
                    <AiOutlineDelete color="red" size={22} onClick={onRemove} />
                </Box>


                <Box alignItems="center" justifyContent="space-between">
                    {/* 선지 종류(한글/숫자) 설정 */}
                    <Box alignItems="center">
                        <Text type="P1" content="이미지 사용 여부" marginRight={5} marginBottom={4} />
                        <Switch 
                            checkedChildren="on" 
                            unCheckedChildren="off" 
                            checked={useImage}
                            onChange={onChangeUseImage}
                        />
                    </Box>

                    {/* 정답률 */}
                    <Box alignItems="center">
                        <Text type="P1" content="정답률" marginRight={8} marginBottom={4} />
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
                            checked={isKor}
                            onChange={setIsKor}
                        />
                    </Box>
                </Box>
                
                <Box marginVertical={8}>
                    <Input.TextArea
                        placeholder="자료 해설"
                        value={description}
                        onChange={setDescription}
                    />
                </Box>

                <Button color="primary" onClick={onTextDetection}>
                    현재 선택 이미지에서 텍스트 추출
                </Button>

                <Box marginVertical={8}>
                    <Input.TextArea
                        placeholder="텍스트 추출 결과"
                        value={detectedText}
                        onChange={onTextChange}
                        autoSize={{minRows: 7}}
                    />
                </Box>

                {/* 자주 사용되는 글자들 */}
                <Text type="D1" content="☆ 자주 사용하는 문자" marginBottom={4} /> 
                <Text type="P1" content="㉠ ㉡ ㉢ ㉣ ㉤ ⓐ ⓑ ⓒ ⓓ ⍺ β θ ⍴ 𝒙 𝒚 𝒛" marginBottom={4} /> 
               

            </Box>
            
            <ChoicesEditor 
                index={index}
                isKor={isKor}
            />

        </Box>
        <Divider />
    </>
    )
}