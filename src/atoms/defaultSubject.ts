import { ISubjectWithChapters } from "interfaces/subject.interface";

export const defaultSubject:ISubjectWithChapters = {
    "code": "BIO-1",
    "name": "생명과학Ⅰ",
    "chapters": [
      {
        "id": 8,
        "title": "Ⅰ. 생명 과학의 이해",
        "index": 1,
        "units": [
          {
            "id": 22,
            "index": 1,
            "title": "01. 생명 과학의 이해"
          }
        ]
      },
      {
        "id": 9,
        "title": "Ⅱ. 사람의 물질대사",
        "index": 2,
        "units": [
          {
            "id": 23,
            "index": 2,
            "title": "02. 생명 활동과 에너지"
          },
          {
            "id": 24,
            "index": 3,
            "title": "03. 물질대사와 건강"
          }
        ]
      },
      {
        "id": 10,
        "title": "Ⅲ. 항상성과 몸의 조절",
        "index": 3,
        "units": [
          {
            "id": 25,
            "index": 4,
            "title": "04. 자극의 전달"
          },
          {
            "id": 26,
            "index": 5,
            "title": "05. 신경계"
          },
          {
            "id": 27,
            "index": 6,
            "title": "06. 항상성"
          },
          {
            "id": 28,
            "index": 7,
            "title": "07. 방어 작용"
          }
        ]
      },
      {
        "id": 11,
        "title": "Ⅳ. 유전",
        "index": 4,
        "units": [
          {
            "id": 29,
            "index": 8,
            "title": "08. 유전 정보와 염색체"
          },
          {
            "id": 30,
            "index": 9,
            "title": "09. 사람의 유전"
          },
          {
            "id": 31,
            "index": 10,
            "title": "10. 사람의 유전병"
          }
        ]
      },
      {
        "id": 12,
        "title": "Ⅴ. 생태계와 상호 작용",
        "index": 5,
        "units": [
          {
            "id": 32,
            "index": 11,
            "title": "11. 생태계의 구성과 기능"
          },
          {
            "id": 33,
            "index": 12,
            "title": "12. 에너지 흐름과 물질 순환, 생물 다양성"
          }
        ]
      }
    ]
}