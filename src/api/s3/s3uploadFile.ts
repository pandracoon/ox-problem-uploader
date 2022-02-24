import { PutObjectCommand } from "@aws-sdk/client-s3";
import { RcFile } from "antd/lib/upload";
import { dataURLtoFile } from "utils/dataURLtoFile";
import { client, BUCKET_NAME } from "./config";


export const s3UploadFile = async (file:RcFile | Blob | string, dir:string, filename: string) => {
    // base64인 경우
    if(typeof file === "string"){
        const fileObj = dataURLtoFile(file, filename)
        file = fileObj.file
        filename = fileObj.filename
    }
    const Key = `${dir}/${filename}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key,
        Body: file
    })

    await client.send(command)

    return `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${Key}`
}

