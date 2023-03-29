FROM node:alpine as buildDocker
WORKDIR /var/app
COPY /package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx 
EXPOSE 80
COPY --from=buildDocker /var/app/build /usr/share/ngnix/html

