FROM node:19-alpine

EXPOSE 3000
EXPOSE 8443

WORKDIR /app

COPY . ./

RUN npm install

CMD npm run start