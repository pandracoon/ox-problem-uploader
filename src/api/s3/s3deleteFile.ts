import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { client, BUCKET_NAME, REGION } from "./config";


export const s3DeleteFile = async (url: string) => {
    const Key = url.split(`https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`).join('');
    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key
    })

    await client.send(command)
}
