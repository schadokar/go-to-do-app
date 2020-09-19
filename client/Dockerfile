# stage - build
FROM node:14-alpine as build
WORKDIR /code
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# stage - release
FROM kyos0109/nginx-distroless:1.16.1-1 as release
WORKDIR /opt/app
COPY --from=build /code/conf/nginx /etc/nginx/conf.d
COPY --from=build /code/build/. .

# stage - dev
# TODO - hot-reload (npm start)