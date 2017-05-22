DROP TABLE IF EXISTS councilors;
CREATE TABLE councilors (
    id SERIAL PRIMARY KEY,
    name text,
    role text,
    imgURL text,
    imgData bytea,
    cityCMSID text UNIQUE
);
