

FROM node:20  AS test
WORKDIR .

COPY . .


ENV NODE_ENV=test

RUN npm ci

USER node

RUN npm run test


FROM node:20 AS build-stage

WORKDIR .

COPY . . 

RUN npm ci

RUN npm run build


FROM nginx:latest

COPY --from=build-stage /dist /usr/share/nginx/html

