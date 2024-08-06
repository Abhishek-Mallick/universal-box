FROM ubuntu:focal

RUN apt-get update
RUN apt-get install -y curl

# Setting up NodeJs 20
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

# Set up Python envionments for python scripts -- later

RUN apt-get install git -y

# Setting up entry script for plura-build-server
# As soon as container is up and running
WORKDIR /home/app

COPY main.sh main.sh
COPY script.js script.js
COPY package*.json .

RUN npm install

RUN chmod +x main.sh
RUN chmod +x script.js

ENTRYPOINT [ "/home/app/main.sh" ]