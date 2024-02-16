FROM node:18.13.0

WORKDIR /usr/api
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]