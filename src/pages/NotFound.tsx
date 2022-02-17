import { Box, Text } from "materials";

export function NotFound (){
    return (
        <Box flexDirection="column" alignItems="center" justifyContent="center" style={{height: "90vh"}}>
            <Text type="H1" size={108} content={404} />
            <Text type="H1" content={"Not Found"} marginTop={24} />
            <Text type="P1" content={"Requested page cannot found"} marginTop={16} />
        </Box>
    )
}