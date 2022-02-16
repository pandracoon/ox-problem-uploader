import { Modal, Upload, ModalProps } from "antd"
import { Box, Text } from "materials"
import { useUploadFiles } from "./hooks"
import { UploadButton } from "./upload-button"

export const ImageUploader = ({...props}: ModalProps) => {
    const {handleFiles, customRequest, remove} = useUploadFiles()


    return (
        <Modal title="이미지 업로드" {...props} >
            <Box flexDirection="column" marginBottom={15}>
                <Text type="P1" bold size={18} content="문제 csv 파일 업로드를 완료한 후 이미지를 업로드해주세요."/>
                <Text type="P2" content="파일명이 같은 파일은 하나만 업로드 됩니다."/>
            </Box>
            <Upload 
                listType="picture"
                accept="image/*"
                multiple
                beforeUpload={handleFiles}
                customRequest={customRequest}
                onRemove={remove}
            >
                <UploadButton />
            </Upload>
        </Modal>
    )
}