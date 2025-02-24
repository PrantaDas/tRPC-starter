FROM node:20

WORKDIR /usr/src/app

RUN npm i -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

EXPOSE 7000

RUN pnpm build

CMD [ "pnpm", "start" ]