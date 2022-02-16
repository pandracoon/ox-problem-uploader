
import { Text } from "materials"
import { GrDocumentCsv } from 'react-icons/gr'
import { problemSelector, useGetunit } from 'atoms';
import { useSetRecoilState } from 'recoil';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { ChoiceUploadFeatures, UploadFeatures } from 'interfaces/upload-features.interface';
import styled from 'styled-components';
import { IChoice } from "interfaces/create-problem.interface";


const papaparseOptions = {
    header: false,
    skipEmptyLines: true,
}

const Form = styled.form`
    display: flex;
    padding: 4px 0;
    :hover {
        background-color: #eee;
    }
    label {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    #csv-file {
        display: none;
    }
`

const KorChoiceIndex = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ"]
const EngChoiceIndex = ["a","b","c","d","e","f","g"]

export default function ProblemCsvReader(){
    const appendProblems = useSetRecoilState(problemSelector);
    const getUnitInfo = useGetunit()

    const onFileLoaded= (data:string[][], fileInfo: IFileInfo, original?: File | undefined) => {
        const today = new Date()
        const keyItem = ""+today.getHours()+today.getMinutes()+today.getSeconds()
        const rawDatas = data.slice(1);
        const problems:UploadFeatures[] = rawDatas.map(
            ([isExam, year,month,source,org,number,unit,
                description,correct_rate,filename, choicesNotation, ...choicesEntry], index) => {
                const unitInfo = getUnitInfo(+unit)

                const choices:ChoiceUploadFeatures[] = []
                const ENTRY_LENGTH = 5;
                for (let i = 0; i < choicesEntry.length; i+=ENTRY_LENGTH) {
                    const $ = Math.floor(i/ENTRY_LENGTH);
                    let index;
                    if(choicesNotation === "ko"){
                        index = KorChoiceIndex[$]
                    } else if(choicesNotation === "en"){
                        index = EngChoiceIndex[$]
                    } else {
                        index = ""+($+1);
                    }

                    const question = choicesEntry[i].trim()
                    if(!question)
                        break;
                    const answer = !!(+choicesEntry[i+1])
                    const solution = choicesEntry[i+2].trim()
                    const choice = {
                        index,
                        question,
                        answer,
                        solution,
                    }

                    const filename = choicesEntry[i+3].trim()
                    const choice_description = choicesEntry[i+4].trim()
                    if(filename)
                        Object.assign(choice, {filename, description: choice_description})

                    choices.push(choice)
                }

                return {
                    key: keyItem+index,
                    isExam: !!+isExam,
                    year:+year,
                    month:+month,
                    source: source.trim(),
                    org:org.trim(),
                    description:description.trim(),
                    number:number.trim(),
                    unit: unitInfo,
                    correct_rate: +correct_rate,
                    filename: filename.trim(),
                    choices
                }
            }
        ).filter(q => q.year)
        appendProblems(problems)
    }

    return (
        <Form>
            <label htmlFor="csv-file">
                <GrDocumentCsv size={28} />
                <Text 
                    type="P1" 
                    bold
                    content="문제 CSV 파일 업로드하기" 
                    marginLeft={8}
                />
            </label>
            <CSVReader
                inputId='csv-file'
                accept=".csv"
                parserOptions={papaparseOptions}
                onFileLoaded={onFileLoaded} 
            />
        </Form>
    );

}