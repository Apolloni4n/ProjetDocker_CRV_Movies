FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install axios express mongoose dotenv cors nodemon
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]