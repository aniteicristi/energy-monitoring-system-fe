# # build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 8000
# CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine

WORKDIR /app/project

COPY package.json .

RUN npm install
COPY . .

EXPOSE 8000
CMD ["npm", "run", "dev"]