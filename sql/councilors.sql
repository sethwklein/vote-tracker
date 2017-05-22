DROP TABLE IF EXISTS councilors;
CREATE TABLE councilors (
    id SERIAL PRIMARY KEY,
    cityCMSID text UNIQUE,
    name text,
    role text,
    cityPage text
    -- imgURL text,
    -- imgData bytea,
);
