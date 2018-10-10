DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
    order integer NOT NULL,
    user integer NOT NULL,

    name text NOT NULL,

    kind text NOT NULL,
    value text,
);
