#!/bin/sh

exec docker run -it --rm \
    --network votingrecord_default \
    --link votingrecord_postgres_1:postgres \
    postgres \
    psql -h postgres -U postgres
