FROM python:3.9.11-buster

ARG EXTRA_PACKAGES
ARG ENVIRONMENT

ENV PYTHONUNBUFFERED 1

COPY requirements/*.txt /tmp/requirements/

WORKDIR /app

COPY run.sh /app/run.sh

RUN set -x \
    && buildDeps=" \
    libffi-dev \
    libpq-dev \
    # gcc \
    # python3-dev \
    # binutils \
    # musl-dev \
    " \
    && runDeps=" \
    postgresql-client \
    " \
    && apt-get update \
    && apt-get install -y --no-install-recommends $buildDeps \
    && apt-get install -y --no-install-recommends $runDeps \
    && apt-get -y install binutils $EXTRA_PACKAGES \
    && pip install -r /tmp/requirements/base.txt \
    && if [ $ENVIRONMENT = dev ]; then \
    # Install python dev dependencies
    pip install -r /tmp/requirements/dev.txt; \
    fi \
    && apt-get remove -y $buildDeps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 8000

RUN chmod 777 /app/run.sh

CMD ["sh", "run.sh"]