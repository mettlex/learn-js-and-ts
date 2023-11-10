# Notes:

## Environment Variables

Create a `.env` file and set the following values:

```
MYSQL_ROOT_PASSWORD=
PMA_PASSWORD=
MYSQL_HOST=
MYSQL_PORT=
MYSQL_DATABASE=
DB_USER=
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
4. Data Validation and Sanitization
  - User input checks
  - Schema validation (e.g. JSON schema)
5. Storage:
  - In-memory storage (Volatile)
  - File based storage (Persistent)
6. In-memory storage:
  - simple variables
  - redis
  - memcached
  - Key-Value in-memory store
7. File based storage:
  - Static file (html, css, js etc.)
  - Complex database:
    - Relational Database: MySQL, PostgreSQL, SQLite etc.
    - NoSQL: MongoDB, Redis etc.
    - Graph: Neo4j etc.
    - Vector: Chroma etc.
    
## Tools you should know

- 2FA apps (Authy, Authenticator, etc.)
- Git
- IDE
- Bash, Zsh, etc.
- SSH
- Search engine
- AI
- Docker
