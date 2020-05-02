FROM python:3.7

ARG EXTRA_PACKAGES
ARG ENVIRONMENT

ENV PYTHONUNBUFFERED 1

RUN apt-get update -y \
    && apt-get -y install binutils $EXTRA_PACKAGES \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app && cd /app

WORKDIR /app

COPY . /app

RUN pip install -r /app/requirements/$ENVIRONMENT.txt --no-cache-dir

RUN chmod 777 /app/run.sh

CMD ["/app/run.sh"]
