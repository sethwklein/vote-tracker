#!/bin/sh

exec docker run -it --rm --link vote-tracker-postgres:postgres \
    postgres \
    psql -h postgres -U postgres
