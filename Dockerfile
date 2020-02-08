FROM nginx:alpine

RUN mkdir usr/share/nginx/html/fruitsshop
COPY /dist/ usr/share/nginx/html/fruitsshop

EXPOSE 80