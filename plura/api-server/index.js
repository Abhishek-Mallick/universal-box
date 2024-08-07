// This pages automates the process of processing the GIT_REPO_URL to the docker container and distrubutes the load

const express = require('express');

const app = express();
const PORT = 9000;

app.listen(PORT, () => console.log(`API Server Running .. ${PORT}`))