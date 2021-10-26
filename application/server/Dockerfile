FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3030

CMD ["/bin/ash", "-c", "sleep", "5000", "&&", "npm", "run", "start"]
