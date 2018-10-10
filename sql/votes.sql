DROP TABLE IF EXISTS votes;
CREATE TABLE votes (
    user integer NOT NULL,
    order integer NOT NULL,
    councilor integer NOT NULL,
    vote string NOT NULL,
);
