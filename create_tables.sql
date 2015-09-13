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
    CHECK (_user_type='Physician' OR specialty IS NULL)
);
CREATE TABLE cookie (
    identifier CHAR(30),
    user       INT REFERENCES _user(id)
);
CREATE TABLE shift (
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES _user(id),
    CHECK (physician.type='Physician')
);
CREATE TABLE appointment (
    start      TIMESTAMP WITH TIME ZONE,
    stop       TIMESTAMP WITH TIME ZONE,
    physician  INT REFERENCES _user(id),
    patient    INT REFERENCES _user(id),
    bill       INT REFERENCES bill(id)
    CHECK (physician.type='Physician' AND patient.type='Patient')
);
CREATE TABLE bill_item (
    bill        INT REFERENCES bill(id),
    name        VARCHAR,
    description VARCHAR,
    physician   INT REFERENCES physician,
    cost        MONEY,
    CHECK (physician.type='Physician')
);
CREATE TABLE bill (
    id          SERIAL PRIMARY KEY,
    appointment INT REFERENCES appointment(id)
);
