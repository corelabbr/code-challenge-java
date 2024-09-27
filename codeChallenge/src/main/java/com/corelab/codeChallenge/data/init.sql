CREATE DATABASE codechallenges;

\c codechallenges;

CREATE SCHEMA corelab;

CREATE TABLE corelab.todos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    color VARCHAR(50) NOT NULL
);
