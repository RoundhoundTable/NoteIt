FROM node:16

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . ./

RUN npx prisma generate

CMD ["npm", "run", "start"]