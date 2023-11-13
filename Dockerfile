FROM node:latest as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY src ./src
COPY public ./public
COPY .env.development ./.env
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
