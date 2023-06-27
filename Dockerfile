FROM node:18.2

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]