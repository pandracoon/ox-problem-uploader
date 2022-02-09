import { ISubject, IUnit } from "interfaces/subject.interface"

const PhysicsUnits:IUnit[] = [{
    index: 1,
    chapter: "Ⅰ. 역학과 에너지",
    unit: "01. 힘과 운동",
},
{
    index: 2,
    chapter: "Ⅰ. 역학과 에너지",
    unit: "02. 운동량과 충격량",
},
{
    index: 3,
    chapter: "Ⅰ. 역학과 에너지",
    unit: "03. 역학적 에너지 보존",
},
{
    index: 4,
    chapter: "Ⅰ. 역학과 에너지",
    unit: "04. 열역학 법칙",
},
{
    index: 5,
    chapter: "Ⅰ. 역학과 에너지",
    unit: "05. 시간과 공간",
},
{
    index: 6,
    chapter: "Ⅱ. 물질과 전자기장",
    unit: "06. 물질의 전기적 특성",
},
{
    index: 7,
    chapter: "Ⅱ. 물질과 전자기장",
    unit: "07. 물질의 자기적 특성",
},
{
    index: 8,
    chapter: "Ⅲ. 파동과 정보 통신",
    unit: "08. 파동의 성질과 활용",
},
{
    index: 9,
    chapter: "Ⅲ. 파동과 정보 통신",
    unit: "09. 빛과 물질의 이중성",
}]

const ChemistryUnits:IUnit[] =[
{
    index: 1,
    chapter: 'Ⅰ. 화학의 첫걸음',
    unit: '01. 우리 생활 속의 화학'
},
{
    index: 2,
    chapter: 'Ⅰ. 화학의 첫걸음',
    unit: '02. 화학식량과 몰'
},
{
    index: 3,
    chapter: 'Ⅰ. 화학의 첫걸음',
    unit: '03. 화학 반응식과 용액의 농도'
},
{
    index: 4,
    chapter: 'Ⅱ. 원자의 세계',
    unit: '04. 원자의 구조'
},
{
    index: 5,
    chapter: 'Ⅱ. 원자의 세계',
    unit: '05. 현대적 원자 모형과 전자 배치'
},
{
    index: 6,
    chapter: 'Ⅱ. 원자의 세계',
    unit: '06. 원소의 주기적 성질'
},
{
    index: 7,
    chapter: 'Ⅲ. 화학 결합과 분자의 세계',
    unit: '07. 이온 결합'
},
{
    index: 8,
    chapter: 'Ⅲ. 화학 결합과 분자의 세계',
    unit: '08. 공유 결합과 결합의 극성'
},
{
    index: 9,
    chapter: 'Ⅲ. 화학 결합과 분자의 세계',
    unit: '09. 분자의 구조와 성질'
},
{
    index: 10,
    chapter: 'Ⅳ. 역동적인 화학 반응',
    unit: '10. 동적 평형'
},
{
    index: 11,
    chapter: 'Ⅳ. 역동적인 화학 반응',
    unit: '11. 산 염기와 중화 반응'
},
{
    index: 12,
    chapter: 'Ⅳ. 역동적인 화학 반응',
    unit: '12. 산화 환원 반응과 화학 반응에서 출입하는 열'
},
]

const BiologyUnits:IUnit[] = [
    {
        index: 1,
        chapter: 'Ⅰ. 생명 과학의 이해',
        unit: '01. 생명 과학의 이해',
    },
    {
        index: 2,
        chapter: 'Ⅱ. 사람의 물질대사',
        unit: '02. 생명 활동과 에너지',
    },
    {
        index: 3,
        chapter: 'Ⅱ. 사람의 물질대사',
        unit: '03. 물질대사와 건강',
    },
    {
        index: 4,
        chapter: 'Ⅲ. 항상성과 몸의 조절',
        unit: '04. 자극의 전달',
    },
    {
        index: 5,
        chapter: 'Ⅲ. 항상성과 몸의 조절',
        unit: '05. 신경계',
    },
    {
        index: 6,
        chapter: 'Ⅲ. 항상성과 몸의 조절',
        unit: '06. 항상성',
    },
    {
        index: 7,
        chapter: 'Ⅲ. 항상성과 몸의 조절',
        unit: '07. 방어 작용',
    },
    {
        index: 8,
        chapter: 'Ⅳ. 유전',
        unit: '08. 유전 정보와 염색체',
    },
    {
        index: 9,
        chapter: 'Ⅳ. 유전',
        unit: '09. 사람의 유전',
    },
    {
        index: 10,
        chapter: 'Ⅳ. 유전',
        unit: '10. 사람의 유전병',
    },
    {
        index: 11,
        chapter: 'Ⅴ. 생태계와 상호 작용',
        unit: '11. 생태계의 구성과 기능',
    },
    {
        index: 12,
        chapter: 'Ⅴ. 생태계와 상호 작용',
        unit: '12. 에너지 흐름과 물질 순환, 생물 다양성',
    },

]

const EarthUnits:IUnit[] = [
    {
        index: 1,
        chapter: 'Ⅰ. 고체 지구',
        unit: '01. 판 구조론과 대륙 분포의 변화',
    },
    {
        index: 2,
        chapter: 'Ⅰ. 고체 지구',
        unit: '02. 판 이동의 원동력과 마그마 활동',
    },
    {
        index: 3,
        chapter: 'Ⅰ. 고체 지구',
        unit: '03. 퇴적암과 지질 구조',
    },
    {
        index: 4,
        chapter: 'Ⅰ. 고체 지구',
        unit: '04. 지구의 역사',
    },
    {
        index: 5,
        chapter: 'Ⅱ. 대기와 해양',
        unit: '05. 대기의 변화',
    },
    {
        index: 6,
        chapter: 'Ⅱ. 대기와 해양',
        unit: '06. 해양의 변화',
    },
    {
        index: 7,
        chapter: 'Ⅱ. 대기와 해양',
        unit: '07. 대기와 해양의 상호 작용',
    },
    {
        index: 8,
        chapter: 'Ⅲ. 우주',
        unit: '08. 별의 특성',
    },
    {
        index: 9,
        chapter: 'Ⅲ. 우주',
        unit: '09. 외계 행성계와 외계 생명체 탐사',
    },
    {
        index: 10,
        chapter: 'Ⅲ. 우주',
        unit: '10. 외부 은하와 우주 팽창',
    },
]

export const subjectsData:ISubject[] = [
    {
        code: "PHY-1",
        name: "물리학1",
        units: PhysicsUnits
    },
    {
        code: "CHE-1",
        name: "화학1",
        units: ChemistryUnits
    },
    {
        code: "BIO-1",
        name: "생명과학1",
        units: BiologyUnits
    },
    {
        code: "EAR-1",
        name: "지구과학1",
        units: EarthUnits
    },
]