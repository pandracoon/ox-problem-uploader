import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = process.env.REACT_APP_S3_ACCESS_ID;
const secretAccessKey = process.env.REACT_APP_S3_SECRET_KEY;
if(!accessKeyId || !secretAccessKey)
    throw Error("Invalid Access Key")

export const client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

export const BUCKET_NAME = 'nemo-images';