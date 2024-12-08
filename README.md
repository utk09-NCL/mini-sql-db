# mini-sql-db

A file-based SQL database written in JavaScript. Uses SQLite-like syntax for querying and managing data.

## Folder Structure

```plaintext
mini-sql-db/
|--- lib/
|    |--- storage.js     # Creating JSON files to store data and run read/write operations
|    |--- schema.js      # Table schema management and validation
|    |--- query.js       # Query parsing and execution
|    |--- indexing.js    # Indexing and search operations
|    |--- backup.js      # Backup and restore operations
|    |--- mutex.js       # Mutex implementation for table locks
|    |--- locks.js       # Locking and unlocking tables
|--- logger/
|    |--- logger.js      # Logging utilities
|--- test/
|    |--- test_db.js     # All test functions
|--- .env                # Environment variables (Create your own)
|--- .gitignore          # Ignored files and folders
|--- .npmrc              # NPM configuration
|--- .prettierrc         # Prettier configuration
|--- eslint.config.js    # ESLint configuration
|--- index.js            # Entry point (re-exports required functions)
|--- package.json
|--- README.md
```

## Setup

- Clone the project
- Run `npm install` inside the project
- Create a `.env` file at root
- Add `MINI_SQL_DB_PATH="./database/"` in `.env` file

## Test

- Run `node test/test_db.js` # This is the test file of all library functions

### Last known Output

```bash
[08 Dec 2024, 13:31:21.872] [SUCCESS] Table "users" created successfully!
[08 Dec 2024, 13:31:21.895] [TEST] Table creation test passed

[08 Dec 2024, 13:31:21.896] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:21.896] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:21.897] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:21.897] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:21.897] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:21.897] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:21.897] [TEST] Insert test passed

┌─────────┬─────┬─────────┐
│ (index) │ id  │  name   │
├─────────┼─────┼─────────┤
│    0    │ 101 │ 'Alice' │
│    1    │ 102 │  'Bob'  │
│    2    │ 103 │ 'John'  │
│    3    │ 104 │  'Tom'  │
│    4    │ 105 │  'MLH'  │
│    5    │ 106 │  'GHW'  │
└─────────┴─────┴─────────┘
[08 Dec 2024, 13:31:21.899] [SUCCESS] SELECT Query executed successfully
┌─────────┬─────┬─────────┬─────┬─────────┐
│ (index) │ id  │  name   │ age │ student │
├─────────┼─────┼─────────┼─────┼─────────┤
│    0    │ 101 │ 'Alice' │ 22  │ 'true'  │
│    1    │ 102 │  'Bob'  │ 25  │ 'true'  │
│    2    │ 103 │ 'John'  │ 32  │ 'false' │
│    3    │ 104 │  'Tom'  │ 28  │ 'true'  │
│    4    │ 105 │  'MLH'  │ 10  │ 'false' │
│    5    │ 106 │  'GHW'  │ 10  │ 'false' │
└─────────┴─────┴─────────┴─────┴─────────┘
[08 Dec 2024, 13:31:21.900] [SUCCESS] SELECT Query executed successfully
[08 Dec 2024, 13:31:21.900] [TEST] Select test passed

[08 Dec 2024, 13:31:21.900] [SUCCESS] Index created on column: "name" of table "users"
[08 Dec 2024, 13:31:21.901] [SUCCESS] Index created on column: "age" of table "users"
[08 Dec 2024, 13:31:21.901] [TEST] Create Index test passed

[08 Dec 2024, 13:31:21.901] [INFO] Found matching rows for "John" in table "users": [ { id: 103, name: 'John', age: 32, student: 'false' } ]
[08 Dec 2024, 13:31:21.902] [INFO] Found matching rows for "10" in table "users": [
  { id: 105, name: 'MLH', age: 10, student: 'false' },
  { id: 106, name: 'GHW', age: 10, student: 'false' }
]
[08 Dec 2024, 13:31:21.902] [TEST] Search Index test passed

[08 Dec 2024, 13:31:21.903] [SUCCESS] Database backup completed successfully! Available at: ./backup
[08 Dec 2024, 13:31:21.903] [TEST] Backup DB test passed

[08 Dec 2024, 13:31:21.904] [SUCCESS] Database restored from ./backup to ./database/ successfully!
[08 Dec 2024, 13:31:21.904] [TEST] Restore DB test passed

[08 Dec 2024, 13:31:21.904] [INFO] [Lock] Mutex created for table "users"
[08 Dec 2024, 13:31:21.904] [DEBUG] [MUTEX] Lock acquired.
[08 Dec 2024, 13:31:21.904] [DEBUG] [MUTEX] Lock busy, request queued
[08 Dec 2024, 13:31:21.904] [INFO] [Lock] Lock acquired for table "users"
[08 Dec 2024, 13:31:21.904] [INFO] [Lock] Performing operation on table "users"
[08 Dec 2024, 13:31:21.904] [TEST] Task 1 started
[08 Dec 2024, 13:31:21.905] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:26.908] [TEST] Task 1 completed
[08 Dec 2024, 13:31:26.910] [DEBUG] [MUTEX] Passing the lock to the next function in the queue
[08 Dec 2024, 13:31:26.910] [DEBUG] [MUTEX] Lock acquired.
[08 Dec 2024, 13:31:26.910] [INFO] [Lock] Lock released for table "users"
[08 Dec 2024, 13:31:26.911] [INFO] [Lock] Lock acquired for table "users"
[08 Dec 2024, 13:31:26.911] [INFO] [Lock] Performing operation on table "users"
[08 Dec 2024, 13:31:26.911] [TEST] Task 2 started
[08 Dec 2024, 13:31:26.913] [SUCCESS] Row inserted into table "users"!
[08 Dec 2024, 13:31:31.914] [TEST] Task 2 completed
[08 Dec 2024, 13:31:31.916] [DEBUG] [MUTEX] Lock released
[08 Dec 2024, 13:31:31.916] [INFO] [Lock] Lock released for table "users"
┌─────────┬─────┬─────────┬─────┬─────────┐
│ (index) │ id  │  name   │ age │ student │
├─────────┼─────┼─────────┼─────┼─────────┤
│    0    │ 101 │ 'Alice' │ 22  │ 'true'  │
│    1    │ 102 │  'Bob'  │ 25  │ 'true'  │
│    2    │ 103 │ 'John'  │ 32  │ 'false' │
│    3    │ 104 │  'Tom'  │ 28  │ 'true'  │
│    4    │ 105 │  'MLH'  │ 10  │ 'false' │
│    5    │ 106 │  'GHW'  │ 10  │ 'false' │
│    6    │ 107 │  'Eve'  │ 23  │ 'true'  │
│    7    │ 108 │ 'Josh'  │ 29  │ 'false' │
└─────────┴─────┴─────────┴─────┴─────────┘
[08 Dec 2024, 13:31:31.920] [SUCCESS] SELECT Query executed successfully
[08 Dec 2024, 13:31:31.920] [TEST] Locks test passed

┌─────────┬─────────────┐
│ (index) │ total_users │
├─────────┼─────────────┤
│    0    │      8      │
└─────────┴─────────────┘
[08 Dec 2024, 13:31:31.921] [SUCCESS] SELECT Query executed successfully
[08 Dec 2024, 13:31:31.923] [TEST] Aggregation test for "total_users" passed

┌─────────┬───────────┐
│ (index) │ age_count │
├─────────┼───────────┤
│    0    │     8     │
└─────────┴───────────┘
[08 Dec 2024, 13:31:31.925] [SUCCESS] SELECT Query executed successfully
[08 Dec 2024, 13:31:31.925] [TEST] Aggregation test for "age_count" passed

┌─────────┬─────────────┐
│ (index) │ average_age │
├─────────┼─────────────┤
│    0    │   22.375    │
└─────────┴─────────────┘
[08 Dec 2024, 13:31:31.926] [SUCCESS] SELECT Query executed successfully
[08 Dec 2024, 13:31:31.926] [TEST] Aggregation test for "average_age" passed

┌─────────┬──────────────────────────┐
│ (index) │ average_age_more_than_10 │
├─────────┼──────────────────────────┤
│    0    │           26.5           │
└─────────┴──────────────────────────┘
[08 Dec 2024, 13:31:31.927] [SUCCESS] SELECT Query executed successfully
[08 Dec 2024, 13:31:31.927] [TEST] Aggregation test for "average_age_more_than_10" passed

[08 Dec 2024, 13:31:31.928] [TEST] Aggregation tests passed
```

### Published on NPM

[https://www.npmjs.com/package/@utk09/mini-sql-db](https://www.npmjs.com/package/@utk09/mini-sql-db)

### GitHub Repository

[https://github.com/utk09-NCL/mini-sql-db](https://github.com/utk09-NCL/mini-sql-db)

### Example Usage

```bash
npm install @utk09/mini-sql-db --save-exact
```

```javascript
// To use import syntax, please add "type": "module" in package.json
import { createTable, insertInto } from "@utk09/mini-sql-db";

// OR, for CommonJS
// const { createTable, insertInto } = require("@utk09/mini-sql-db");

createTable("CREATE TABLE products (id int, name txt, quantity int)");
insertInto("INSERT INTO products (id, name, quantity) VALUES (101, 'Apple', 10)");
```

You can check the [test_db.js](./test/test_db.js) file for more examples.

#### Author

[utk09-NCL](https://utk09.com)
