FROM node:15 AS build

WORKDIR /filmes-app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn run build


FROM nginx:1.19.6

COPY --from=build /filmes-app/dist/filmes-app /usr/share/nginx/html

EXPOSE 4200

COPY ./deploy/filmes.conf /etc/nginx/conf.d/filmes.conf