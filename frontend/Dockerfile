FROM node:18
WORKDIR /frontend
COPY package*.json .
RUN npm ci --omit=dev
COPY . .
RUN npm run build