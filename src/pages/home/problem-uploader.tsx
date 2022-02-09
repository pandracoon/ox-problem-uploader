
import { Text } from "materials"
import { GrDocumentCsv } from 'react-icons/gr'
import { problemSelector } from 'atoms';
import { useSetRecoilState } from 'recoil';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { UploadFeatures } from 'interfaces/upload-features.interface';
import styled from 'styled-components';


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

export default function ProblemCsvReader(){
    const appendProblems = useSetRecoilState(problemSelector);
    const onFileLoaded= (data:string[][], fileInfo: IFileInfo, original?: File | undefined) => {
        const today = new Date()
        const keyItem = ""+today.getHours()+today.getMinutes()+today.getSeconds()
        const rawDatas = data.slice(1);
        const problems:UploadFeatures[] = rawDatas.map(
            ([isExam, year,month,source,org,number,
                unit,no,question,answer,filename], index) => {
                
                return {
                    key: keyItem+index,
                    isExam: !!+isExam,
                    year:+year,
                    month:+month,
                    source: source.trim(),
                    org,
                    number,
                    chapter: unit,
                    unit,
                    no,
                    question: question.trim(),
                    answer: !!+answer,
                    filename: filename.trim()
                }
            }
        )
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
                parserOptions={papaparseOptions}
                onFileLoaded={onFileLoaded} 
            />
        </Form>
    );

}