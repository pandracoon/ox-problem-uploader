import { ISource } from "interfaces/source.interface";

export interface IExam extends Omit<Omit<ISource, 'year'>, 'subject'> {}

export const exams:IExam[] = [
{
    month:3,
    org:"교육청", 
    source: "모의고사",
    alias: "3월 교육청 모의고사"
},
    
{
    month:4,
    org:"교육청", 
    source: "모의고사",
    alias: "4월 교육청 모의고사"
},
    
{
    month:6,
    org:"평가원", 
    source: "모의평가",
    alias: "6월 평가원 모의평가"
},
    
{
    month:7,
    org:"교육청", 
    source: "모의고사",
    alias: "7월 교육청 모의고사"
},
    
{
    month:9,
    org:"평가원", 
    source: "모의평가",
    alias: "9월 평가원 모의평가"
},
    
{
    month:10,
    org:"교육청", 
    source: "모의고사",
    alias: "10월 교육청 모의고사"
},
    
{
    month: 11,
    org:"평가원", 
    source: "수능",
    alias: "수능"
},
]



