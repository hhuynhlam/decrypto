FROM node:14.4-buster

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./public ./public
COPY ./server ./server
COPY ./src ./src

RUN npm run build

CMD npm run server
