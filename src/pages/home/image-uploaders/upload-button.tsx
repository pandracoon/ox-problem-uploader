import { Button } from "antd"
import { IoImageOutline } from "react-icons/io5"

const ButtonStyle = { marginBottom:12 }
const IconStyle = { marginBottom:-6, marginRight:6, fontSize: 23 }

export const UploadButton = () => {
    return (
        <Button 
            style={ButtonStyle} 
            icon={<IoImageOutline style={IconStyle} />}
        >
            문제 그림 업로드
        </Button>
    )
}