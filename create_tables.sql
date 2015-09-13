CREATE TYPE AS ENUM ('Physician', 'Patient');
CREATE TABLE _user (
    id        SERIAL PRIMARY KEY,
    username  VARCHAR,
    firstname VARCHAR,
    lastname  VARCHAR,
    email     VARCHAR,
    password  VARCHAR
    specialty INT REFERENCES specialty(id)
);
CREATE TABLE cookie (
    identifier CHAR(30),
    user       INT REFERENCES _user(id)
);
CREATE TABLE specialty (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR,
    description VARCHAR
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
CREATE TABLE bill_item (
    bill        INT REFERENCES bill(id),
    name        VARCHAR,
    description VARCHAR,
    physician   INT REFERENCES physician,
    cost        MONEY
);
CREATE TABLE bill (
    id          SERIAL PRIMARY KEY,
    appointment INT REFERENCES appointment(id)
);
