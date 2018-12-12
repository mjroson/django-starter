FROM python:3.6.0
MAINTAINER Made2
ENV PYTHONUNBUFFERED 1

RUN apt-get update -y \
    && apt-get -y install binutils \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r /usr/src/app/requirements.txt --no-cache-dir

RUN chmod 777 /usr/src/app/run.sh

CMD ['/usr/src/app/run.sh']
