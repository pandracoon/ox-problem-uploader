import { Modal, ModalProps, Upload } from "antd"
import { useUploadFiles } from "./hooks";
import { UploadButton } from "./upload-button";

export interface SingleImageUploaderProps extends ModalProps {
    targetFilename?: string
}

export const SingleImageUploader = ({targetFilename, ...props}:SingleImageUploaderProps) => {
    const {handleFiles, customRequest, remove} = useUploadFiles()
    

    return targetFilename ? (
        <Modal title={`${targetFilename} 업로드`}>
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
                <UploadButton />
            </Upload>
        </Modal>
    ) : null
}