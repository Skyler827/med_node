CREATE TABLE _user (
    username  VARCHAR,
    email     VARCHAR,
    password  VARCHAR
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
CREATE TABLE physician (
    id        SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname  VARCHAR,
    user_id   INT REFERENCES _user(id),
    specialty INT REFERENCES specialty(id)
);
CREATE TABLE shift (
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES physician(id)
);
CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname  VARCHAR,
    user_id   INT REFERENCES _user(id)
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
