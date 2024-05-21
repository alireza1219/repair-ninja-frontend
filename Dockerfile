FROM node:alpine3.19 as builder

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/
RUN npm run build

FROM nginx:1.25.4-alpine

RUN apk add --update --no-cache openssl

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./docker/nginx/confs/* /etc/nginx/
COPY ./docker/nginx/run.sh /run.sh

RUN chmod +x /run.sh

EXPOSE 80 443

CMD ["/run.sh"]