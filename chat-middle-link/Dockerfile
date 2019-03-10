FROM nginx:1.14.1-alpine

COPY . .

COPY default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
