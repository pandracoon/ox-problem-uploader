import { PutObjectCommand } from "@aws-sdk/client-s3";
import { RcFile } from "antd/lib/upload";
import { client, BUCKET_NAME } from "./config";


export const s3UploadFile = async (file:RcFile | Blob | string, dir:string, filename: string) => {
    const Key = `${dir}/${filename}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key,
        Body: file
    })

    await client.send(command)

    return `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${Key}`
}
