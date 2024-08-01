import { exec } from 'child_process';
import path from 'path';

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

        for (const filePath of distFolderContent) {
            if(fs.lstatSync(filePath).isDirectory())
                continue; // Inside S3 we dont need to put folder paths
            /*
                Lets says we have something like
                    assets/
                        script.js

                So we want to put script.js in S3 and it we'll recognize the directory structure for it
            */
           
        }
    })
}