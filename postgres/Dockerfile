FROM postgres:latest

ENV POSTGRES_USER openthisworld
ENV POSTGRES_PASSWORD p@ssw0rd
ENV POSTGRES_DB main

COPY init.sql /docker-entrypoint-initdb.d/
