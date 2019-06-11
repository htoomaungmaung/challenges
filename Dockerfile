# Stage 1
FROM node:alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

FROM nginx:1.15.2-alpine
COPY --from=react-build app/build /var/www
COPY --from=react-build app/public /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
