# Notes:

## Environment Variables

Create a `.env` file and set the following values:

```
MYSQL_ROOT_PASSWORD=
PMA_PASSWORD=
```

Modern HTTP API has these components:

1. Security
  - Secure HTTP Headers
  - CORS
  - OWASP Top 10
2. CRUDL = Create, Read, Update, Delete, List
3. REST API
  - GET for receiving resources
  - POST to create new resources
  - PUT/PATCH to update/edit existing resources
  - DELETE to delete existing resources
4. Storage:
  - In-memory storage (Volatile)
  - File based storage (Persistent)
5. In-memory storage:
  - simple variables
  - redis
  - memcached
  - Key-Value in-memory store
6. File based storage:
  - Static file (html, css, js etc.)
  - Complex database:
    - Relational Database: MySQL, PostgreSQL, SQLite etc.
    - NoSQL: MongoDB, Redis etc.
    - Graph: Neo4j etc.
    - Vector: Chroma etc.
    