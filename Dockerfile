FROM node:20-alpine

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_FUND=false

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3005

CMD ["npm", "run", "start:prod"]