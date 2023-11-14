FROM node:latest as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY src ./src
COPY public ./public
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY entrypoint.sh /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/share/nginx/html/entrypoint.sh"]
