import { ColumnsType } from "antd/lib/table";
import { UploadFeatures } from "interfaces/upload-features.interface";
import { ChapterRenderer, UnitRenderer, RowDeleter, AnswerRenderer, ImageNameRenderer, IsExamRenderer } from "./CellRenderers";


export const columns: ColumnsType<UploadFeatures> = [
    {
      title: '기출 여부',
      dataIndex: 'isExam',
      key: 'isExam',
      align: "center",
      render: IsExamRenderer
    },
    {
      title: '발행연도',
      dataIndex: 'year',
      key: 'year',
      align: 'center',
    },
    {
      title: '월',
      dataIndex:  'month',
      key:  'month',
      align: 'center',
    },
    {
      title: '출처명',
      dataIndex: 'source',
      key: 'source',
      align: 'center',
    },
    {
      title: '출제기관',
      dataIndex: 'org',
      key: 'org',
      align: 'center',
    },
    {
      title: '번호',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
    }, 
    {
      title: '대단원',
      dataIndex: 'chapter',
      key: 'chapter',
      render: ChapterRenderer
    },
    {
      title: '소단원',
      dataIndex: 'unit',
      key: 'unit',
      render: UnitRenderer
    },
    {
      title: ' 선지',
      dataIndex:	 'no',
      key: 'no',
      align: 'center',
    },
    {
      title: '문제',
      dataIndex: 'question',
      key: 'question',      
    },
    {
      title: '정답',
      dataIndex: 'answer',
      key: 'answer',
      align: "center",
      render: AnswerRenderer
    },
    {
      title: '해설',
      dataIndex: 'solution',
      key: 'solution',
      align: "center",
      ellipsis: true,
    },
    {
      title: '사진파일명',
      dataIndex: 'filename',
      align: 'center',
      key: 'filename',
      render: ImageNameRenderer,
    },
    {
      title: "삭제",
      key: "delete",
      align: 'center',
      render: RowDeleter
    }
];