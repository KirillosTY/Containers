

FROM node:20  AS test
WORKDIR .

COPY . .


ENV NODE_ENV=test

RUN npm ci

USER node

RUN npm run test

FROM node:20 AS build-stage

ENV VITE_BACKEND_URL="http://localhost:3000"

WORKDIR .

COPY . . 

RUN npm ci

RUN npm run build


FROM nginx:1.25-alpine

COPY --from=build-stage /dist /usr/share/nginx/html

