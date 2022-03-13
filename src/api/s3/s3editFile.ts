import { PutObjectCommand } from "@aws-sdk/client-s3";
import { RcFile } from "antd/lib/upload";
import { dataURLtoFile } from "utils/dataURLtoFile";
import { client, BUCKET_NAME, REGION } from "./config";


export const s3EditFile = async (file:RcFile | Blob | string, filename: string) => {
   
    let temp = filename.split("https://")[1]
    let Bucket = temp.split('.s3.')[0]
    let [Region, Key] = temp.split('.s3.')[1].split(".amazonaws.com/")

     // base64인 경우
     if(typeof file === "string"){
        const fileObj = dataURLtoFile(file, Key)
        file = fileObj.file
    }
    
    const putCommand = new PutObjectCommand({
        Bucket,
        Key,
        Body: file
    })

    await client.send(putCommand)
    console.log('uploaded')

    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${Key}`
}

