#!/bin/bash

export GIT_REPO_URL = "$GIT_REPO_URL"

git clone "$GIT_REPO_URL" /home/app/output # cloning the repo in /home/app/output path

exec node script.js