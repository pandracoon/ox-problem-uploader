import { ColumnsType } from "antd/lib/table";
import { UploadFeatures } from "interfaces/upload-features.interface";
import { RowDeleter, ImageNameRenderer, IsExamRenderer, ChoiceRenderer } from "./CellRenderers";


export const columns: ColumnsType<UploadFeatures> = [
    {
      title: '기출 여부',
      dataIndex: 'isExam',
      key: 'isExam',
      align: "center",
      render: IsExamRenderer,
      width: 90
    },
    {
      title: '발행연도',
      dataIndex: 'year',
      key: 'year',
      align: 'center',
      width: 90
    },
    {
      title: '월',
      dataIndex:  'month',
      key:  'month',
      align: 'center',
      width: 60
    },
    {
      title: '출처명',
      dataIndex: 'source',
      key: 'source',
      align: 'center',
      width: 90
    },
    {
      title: '출제기관',
      dataIndex: 'org',
      key: 'org',
      align: 'center',
      ellipsis: true,
      width: 90
    },
    {
      title: '번호',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      width: 70
    }, 
    {
      title: '자료 설명',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '공통 해설',
      dataIndex: 'solution',
      key: 'solution',
    },
    {
      title: '정답률',
      dataIndex: 'correct_rate',
      key: 'correct_rate',
      align: "center",
      width: 70
    },
    {
      title: '사진파일명',
      dataIndex: 'filename',
      align: 'center',
      key: 'filename',
      render: ImageNameRenderer,
      width: 130
    },
    {
      title: '선지',
      dataIndex: 'choices',
      key: 'choices',
      align: 'center',
      render: ChoiceRenderer,
      width: 160
    },
    {
      title: "삭제",
      key: "delete",
      align: 'center',
      render: RowDeleter,
      width: 60
    }
];