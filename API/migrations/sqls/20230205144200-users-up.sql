/* Create Table Users*/
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    image VARCHAR(255)
);