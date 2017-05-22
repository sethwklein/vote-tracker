#!/bin/sh

# get argument and make it absolute
external_name=
internal_name=/$(basename "$1")
case $1 in
    /*)
        external_name=$1
    ;;
    ?*)
        external_name=$(pwd)/$1
    ;;
    *)
        echo "Error: no file specified" 1>&2
        exit 1
    ;;
esac

exec docker run --rm --link vote-tracker-postgres:postgres \
    -v "$external_name:$internal_name" \
    postgres \
    psql -h postgres -U postgres -f "$internal_name"
