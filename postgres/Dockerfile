FROM postgres:latest

ENV POSTGRES_USER your-db-user
ENV POSTGRES_PASSWORD your-db-password
ENV POSTGRES_DB your-db-name

COPY init.sql /docker-entrypoint-initdb.d/
