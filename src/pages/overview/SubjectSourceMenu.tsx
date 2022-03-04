import { Menu } from "antd"
import { getProblemCountsBySubject } from "api/get-problem-counts-by-subject"
import { getProblemCountsBySource } from "api/get-problem-counts-by-source"
import { ProblemCountBySourceProps, ProblemCountBySubjectProps } from "interfaces/problem-count.interface"
import { sourceToAlias } from "interfaces/source.interface"
import { useEffect, useState } from "react"

interface SubjectSourceMenuProps {
    onSelectSource: (subject: ProblemCountBySubjectProps, source: ProblemCountBySourceProps) => void
}

interface SourceCache {
    [key: string]: ProblemCountBySourceProps[]
}
export const SubjectSourceMenu = ({onSelectSource}:SubjectSourceMenuProps) => {
    const [subjectCounts, setSubjectCounts] = useState<ProblemCountBySubjectProps[]>([])
    const [sources, setSources] = useState<SourceCache>({})

    useEffect(() => {
        getProblemCountsBySubject()
            .then(res => {
                setSubjectCounts(res.data)
            })
    },[])

    const onExpand = ({key: code}:{key: string}) => {
        if(sources[code])
            return;
        getProblemCountsBySource(code)
            .then(res => setSources(prev => ({...prev, [code]: res.data})))
    }


    return (
        <Menu mode="inline" style={{width: 256, minHeight: '100vh'}}>
            <Menu.Divider />
            {subjectCounts.map((subject) => (
                <Menu.SubMenu title={`${subject.name}(${subject.problemCount})`} key={subject.code} onTitleClick={onExpand} >
                    {sources[subject.code]?.map(source => (
                        <Menu.Item key={`${subject.code}_${source.id}`} onClick={() => onSelectSource(subject, source)}>
                            {sourceToAlias(source)} ({source.problemCount})
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    )
}