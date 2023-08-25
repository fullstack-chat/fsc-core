FROM node:18

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY src/ ./src
COPY .env ./
COPY tsconfig.json ./

RUN npm run build

CMD [ "node", "dist/main.js" ]
