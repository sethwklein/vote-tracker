# vote-tracker

Vote-tracker is a web app for tracking Portland, Maine city council votes.

## Data sources

Votes back as far as 1996 appear to be recorded in PDF's listed under City
Council on http://www.portlandmaine.gov/AgendaCenter

Orders as far back as fiscal year 2012/2013 (FY 12/13) can be found in PDF's
listed under City Council on http://www.portlandmaine.gov/DocumentCenter

## Contributing

### Dependencies

* Node v6.10.3 (other versions may work)

### Setup

```sh
npm install
```

### Local development

We don't use `package.json` scripts because JSON doesn't allow comments.

To run the database:

```sh
./run-database.sh
```

Shut it down with Ctrl+C.

If you have `psql` installed, you can use it to connect just like you would
to any Postgres running on localhost.

If you don't, use can use `psql` without installing it by running it from
within Docker using this handy script:

```sh
./psql.sh
```

To run the frontend build process:

```sh
export PATH="$PWD/node_modules/.bin:$PATH"
gulp watch
```

To run the server:

```sh
node server
```

### Files

* See the `config` object in `gulpfile.js` for locations of the frontend files.
* Database contents is in `db`. You can shut the database down and move that
    directory aside if you want to start fresh.
