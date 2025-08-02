FROM node:20

WORKDIR /usr/src/app

COPY ./part4 .


RUN npm install

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]