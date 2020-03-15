About
==================

This is a simple Spring Boot project designed as a web service with responsive UI built on the top of React.

DB configuration
==================

In the case of PostgresSQL as the main database of service create a database journaldb first:

```
psql -U postgres
create database journaldb
```

List all databases to see a newly created database on the list:

```
\l
```

To connect to a database use the command:

```
\c journaldb
```

To see the table's scheme use the command:

```
\d <table name>
```

REST web interface
==================

All resources are available from one endpoint:

```
/api
```

All users of service must be authorized first. The authorization end point is
 
```
POST /login
```
Body in post request must contain username/password pair

After successful  authorization service will return token in Authorization header. 
After that we can call the other RESTful service endpoints by sending the JWT token back in Authorization header.

