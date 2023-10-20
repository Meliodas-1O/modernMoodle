FROM node:18
WORKDIR /backend
COPY package*.json .
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 5050
CMD ["node", "dist/src/index.js"]