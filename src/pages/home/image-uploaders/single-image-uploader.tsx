import { Modal, ModalProps, Upload } from "antd"
import { Box, Text } from "materials";
import { IoAdd } from "react-icons/io5";
import { useUploadFiles } from "./hooks";

export interface SingleImageUploaderProps extends ModalProps {
    targetFilename: string
}

export const SingleImageUploader = ({targetFilename, ...props}:SingleImageUploaderProps) => {
    const {handleFiles, customRequest, remove} = useUploadFiles()
    

    return (
        <Modal title={`${targetFilename} 업로드`} {...props} >
            <Upload 
                listType="picture-card"
                accept="image/*"
                beforeUpload={handleFiles}
                customRequest={customRequest}
                onRemove={remove}
                showUploadList={{
                    removeIcon: null
                }}
            >
                <Box flexDirection="column" alignItems="center">
                    <IoAdd size={40} />
                   <Text type="D1" content={targetFilename} elipsis marginBottom={-3}/>
                   <Text type="D2" content="업로드" />
                </Box>
                {/* <UploadButton /> */}
            </Upload>
        </Modal>
    )
}