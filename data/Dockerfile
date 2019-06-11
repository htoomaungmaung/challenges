FROM node:alpine    
EXPOSE 3000
COPY ./db.json /data/db.json
RUN yarn global add json-server
CMD ["json-server", "-H", "0.0.0.0", "/data/db.json"]