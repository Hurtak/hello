FROM node:14-alpine

COPY package.json /hello/
COPY package-lock.json /hello/
COPY index.js /hello/

WORKDIR /hello/

RUN npm ci

ENV NODE_ENV production
CMD node index.js
