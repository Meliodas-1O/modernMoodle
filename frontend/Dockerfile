# Use a node image to build the react app
FROM node:20-alpine as builder
WORKDIR /frontend
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build --omit=dev

# ---

# Use nginx to serve static files
FROM nginx:1.25
WORKDIR /usr/share/nginx/html/
RUN rm -rf ./*
COPY --from=builder /frontend/build .
RUN rm -rf /etc/nginx/conf.d/*
ADD ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]