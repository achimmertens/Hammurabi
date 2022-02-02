CREATE TABLE userlog
(
      id   VARCHAR(15)  NOT NULL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      logintime TIMESTAMP NOT NULL
);