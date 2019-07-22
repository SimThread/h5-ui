FROM alpine:latest

# Install nginx
RUN apk add --update nginx && rm -rf /var/cache/apk/*
ARG CI_COMMIT_REF_NAME
ARG ProjecHtdocsDir
COPY ./docs/dist ${ProjecHtdocsDir}
COPY ./_gitlabci/nginx_conf_${CI_COMMIT_REF_NAME} /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]