CREATE TABLE task (
   id BIGINT(19) PRIMARY KEY NOT NULL,
   name VARCHAR (255) NOT NULL,
   status VARCHAR (64) NOT NULL,
   created_date DATE  NOT NULL,
   description VARCHAR (255),
   assignee BIGINT(19) FOREIGN KEY
);