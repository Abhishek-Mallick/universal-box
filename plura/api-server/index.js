// This pages automates the process of processing the GIT_REPO_URL to the docker container and distrubutes the load

const express = require('express');
const { generateSlug } = require('random-word-slugs');
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs')
const config = require('../build-server/config')

const app = express();
const PORT = 9000;

const ecsClient = new ECSClient({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
    }
})

const ClusterARN = config.cluster.ClusterARN
const TaskARN = config.cluster.TaskARN

app.use(express.json())

app.post('/project', async (req, res) => {
    // currently using Random Slug but use a db to store user given slugs and need to click on check availability to do it
    const { gitURL } = req.body; // GIT_REPO_URL
    const projectSlug = generateSlug(); // PROJECT_ID

    // Spin the container
    const command = new RunTaskCommand({
        cluster: ClusterARN,
        taskDefinition: TaskARN,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                subnets: ['subnet-0e74eae05b6f17407','subnet-0597995079a329cb7','subnet-0588e0625237c64f2'],
                securityGroups: ['sg-091230a2bf0680ca4'],
                assignPublicIp: 'ENABLED'
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: 'builder-image',
                    environment: [
                        {
                            name: 'GIT_REPO_URL',
                            value: gitURL
                        },
                        {
                            name: 'PROJECT_ID',
                            value: projectSlug
                        }
                    ]
                }
            ]
        }
    })

    await ecsClient.send(command)

    return res.json({ status: 'queued', data: {projectSlug, url: `http://${projectSlug}.localhost:8000`} })

})

app.listen(PORT, () => console.log(`API Server Running .. ${PORT}`))