FROM node:20

WORKDIR /usr/server/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]

