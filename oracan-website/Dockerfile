FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install serve -g

COPY . .

RUN npm run build

EXPOSE 3100

CMD ["serve", "-s","build", "-p","3100"]