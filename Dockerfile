FROM node:18-alpine


WORKDIR /app

COPY package*.json ./

RUN npm install --produciton

COPY . .

EXPOSE 5000

CMD ["node","./dist/index.js"]