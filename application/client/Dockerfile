FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
