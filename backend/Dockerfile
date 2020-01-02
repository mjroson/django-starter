FROM python:3.7

ARG EXTRA_PACKAGES
ARG ENVIRONMENT

MAINTAINER matiroson@gmail.com

ENV PYTHONUNBUFFERED 1

RUN apt-get update -y \
    && apt-get -y install binutils $EXTRA_PACKAGES \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r /usr/src/app/requirements/$ENVIRONMENT.txt --no-cache-dir

RUN chmod 777 /usr/src/app/run.sh

CMD ['/usr/src/app/run.sh']
