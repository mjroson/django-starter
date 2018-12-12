FROM nginx:latest
MAINTAINER mjroson <matiroson@gmail.com>

# Create forlder for nginx logs
RUN mkdir -p /tmp/logs

RUN mkdir -p /run/nginx

RUN rm /etc/nginx/conf.d/default.conf

# Add custom config
COPY site.conf /etc/nginx/conf.d/site.template

