# Boilerplate for deploy real projects with docker, django, celery, rabbitmq, postgresql, nginx and reactjs.

## Resources

### Devops

    Use image cerbot to automatic renovation lentscrypt ssl certificate.
    https://github.com/wmnnd/nginx-certbot

    Based to
    https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

### Backend

### Frontend

    Package React to manager url queryparams
    https://github.com/pbeshai/react-url-query

## Deploy

### Local deploy:

1. Copy docker-compose.local.yml to docker-compose.override.yml
   `cp docker-compose.local.yml docker-compose.overide.yml`
2. Copy the environment file
   `cp .env.local .env`
3. Up project
   `docker-compose up`

### Production deploy

1. Copy docker-compose.local.yml to docker-compose.override.yml
   `cp docker-compose.prod.yml docker-compose.overide.yml`
2. Copy the environment file
   `cp .env.prod .env`
3. Up project
   `docker-compose up`
