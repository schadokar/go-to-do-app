# stage - build part 1
FROM node:14-alpine as immutable-dependencies
WORKDIR /code
RUN npm set progress=false && npm config set depth 0
COPY package.json package-lock.json ./
RUN npm install
# stage - build part 2
FROM node:14-alpine as build
WORKDIR /code
COPY --from=immutable-dependencies /code/node_modules ./node_modules
COPY . .
RUN npm run build

# stage - release
# FROM kyos0109/nginx-distroless:1.16.1-1 as release
FROM abdennour/nginx-distroless-unprivileged:1.18 as release
WORKDIR /opt/app
COPY --from=build --chown=1001:0 /code/conf/nginx /etc/nginx/conf.d
COPY --from=build  --chown=1001:0 /code/build/. .
EXPOSE 8080
USER 1001
# stage - dev
# TODO - hot-reload (npm start)