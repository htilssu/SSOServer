"use server"

import {PutObjectCommand} from "@aws-sdk/client-s3";
import client from "@/s3client.ts";
import {auth} from "@/services/auth.service.ts";

const BUCKET_NAME = process.env.S3_BUCKET;
if (!BUCKET_NAME) throw new Error("Missing required environment variable for S3 configuration");

export async function uploadImageToS3(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        ACL: 'public-read',
        Key: file.name,
        Body: Buffer.from(arrayBuffer),
    });

    return await client.send(command);
}

export async function uploadAvatar(file: File) {
    const session = await auth();
    const a = await uploadImageToS3(file);
}