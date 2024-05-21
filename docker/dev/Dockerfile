FROM node:alpine3.19

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

COPY ./docker/dev/vite.config.ts /app/

EXPOSE 5173

CMD ["npm", "run", "dev"]