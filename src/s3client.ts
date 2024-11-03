/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of htilssu. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 17-10-2024
 *  ******************************************************
 */

/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of htilssu. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 17-10-2024
 *  ******************************************************
 */
import {Bucket, ListBucketsCommand, S3Client} from "@aws-sdk/client-s3";

const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION;
if (!accessKeyId || !secretAccessKey || !endpoint || !region) {
    throw new Error("Missing required environment variables for S3 configuration");
}

const client = new S3Client({
    region: region,
    endpoint: endpoint,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});

const command = new ListBucketsCommand({
    MaxBuckets: 10
});


const buckets: Bucket[] = [];


client.send(command).then((data) => {
    buckets.push(...data.Buckets!);
}).catch((error) => {
    console.error("Error listing buckets:", error);
});

export {buckets};
export default client;


