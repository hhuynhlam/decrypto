FROM node:12.16-buster

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./bin ./bin
COPY ./public ./public
COPY ./server ./server
COPY ./src ./src

CMD ./bin/serve
