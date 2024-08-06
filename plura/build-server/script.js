const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')
require('dotenv').config(); 

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})
const ProjectId = process.env.PROJECT_ID

async function init() {
    console.log("----Script.js execution started----")
    const outDirPath = path.join(__dirname, 'output');

    const proc = exec(`cd ${outDirPath} && npm install && npm run build`)

    proc.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    proc.stdout.on('error', (error) => {
        console.log('Error!!',error.toString());
    });

    proc.on('close', async () => {
        console.log("Build Completed")
        const distFolderPath = path.join(__dirname, 'output', 'dist');
        const distFolderContent = fs.readdirSync(distFolderPath, { recursive: true });

        for (const file of distFolderContent) {
            const filePath = path.join(distFolderPath, file)
            if(fs.lstatSync(filePath).isDirectory())
                continue; // Inside S3 we dont need to put folder paths
            console.log("Uploading: ", filePath)
            /*
                Lets says we have something like
                    assets/
                        script.js

                So we want to put script.js in S3 and it we'll recognize the directory structure for it
            */
           // Content type of the file changes dynamically and the user can have anything on their codebase
           // mine-types helps in identifying the content type
            const command = new PutObjectCommand({
                Bucket: 'plura',
                Key: `__output/${ProjectId}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command)
            console.log("Uploaded: ", filePath)
        }
        console.log("Upload Completed")
    })
}

init()