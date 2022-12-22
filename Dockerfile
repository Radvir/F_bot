FROM node:18.12.1

WORKDIR /F_bot

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]