FROM node:20
WORKDIR /helper
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "run", "migrate"]