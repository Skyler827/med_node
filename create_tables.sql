CREATE TABLE physician (
    id        SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname  VARCHAR,
    specialty INT REFERENCES specialty(id)
);

CREATE TABLE specialty (
    id     SERIAL PRIMARY KEY,
    name   VARCHAR
);
CREATE TABLE shift (
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES physician(id)
);

CREATE TABLE appointment (
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES physician(id),
    patient    INT REFERENCES patient(id),
    bill       INT REFERENCES bill(id)
);

CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname  VARCHAR,
);

CREATE TABLE bill_item (
    name        VARCHAR,
    description VARCHAR,
    physician   INT REFERENCES physician,
    cost        MONEY
);
CREATE TABLE bill (
    id          SERIAL PRIMARY KEY,
    appointment INT REFERENCES appointment(id)
);
