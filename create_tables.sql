CREATE TYPE _user_type AS ENUM ('Physician', 'Patient');
CREATE TABLE specialty (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR,
    description VARCHAR
);
CREATE TABLE _user (
    id        SERIAL PRIMARY KEY,
    type      _user_type,
    username  VARCHAR,
    firstname VARCHAR,
    lastname  VARCHAR,
    email     VARCHAR,
    password  VARCHAR,
    specialty INT REFERENCES specialty(id)
);
--CREATE TABLE cookie (
--    identifier CHAR(30),
--    user       INT REFERENCES _user(id)
--);
CREATE TABLE shift (
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES _user(id)
);
CREATE TABLE appointment (
    id         SERIAL PRIMARY KEY,
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES _user(id),
    patient    INT REFERENCES _user(id),
    cost       MONEY
);
CREATE TABLE bill_item (
    appointment INT REFERENCES appointment(id),
    name        VARCHAR,
    description VARCHAR,
    physician   INT REFERENCES _user(id),
    cost        MONEY
);
