import { Button } from "antd";
import { Box, Text } from "materials";
import { useNavigate } from "react-router-dom";

export function NotFound (){
    const navigate = useNavigate()
    return (
        <Box flexDirection="column" alignItems="center" justifyContent="center" style={{height: "90vh"}}>
            <Text type="H1" size={108} content={404} />
            <Text type="H1" content={"Not Found"} marginTop={24} />
            <Text type="P1" content={"Requested page cannot found"} marginVertical={16} />
            <Button onClick={() => navigate('/')}>
                홈으로
            </Button>
        </Box>
    )
}