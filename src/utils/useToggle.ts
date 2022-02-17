import { useState } from "react"

export default (defaultValue:boolean):[boolean, ()=>void] => {
    const [state, setState] = useState<boolean>(defaultValue)
    const toggleState = () => setState(prev => !prev)
    return [state, toggleState]
}