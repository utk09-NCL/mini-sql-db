# mini-sql-db

A file-based SQL database written in JavaScript. Uses SQLite-like syntax for querying and managing data.

## Folder Structure

```plaintext
mini-sql-db/
|--- lib/
|    |--- storage.js     # Creating JSON files to store data and run read/write operations
|    |--- schema.js      # Table schema management and validation
|    |--- query.js       # Query parsing and execution
|    |---
|    |---
|    |---
|--- logger/
|    |--- logger.js     # Logging utilities
|--- test/
|    |--- test_db.js    # All test functions
|--- index.js
|--- package.json
|--- README.md
|--- sql_syntax.txt
```

## Setup

- Clone the project
- Run `npm install` inside the project
- Create a `.env` file at root
- Copy from `.env.example` over to `.env`

## Test

- Run `node test/test_db.js` # This is the test file of all library functions

Sample Output:

```bash
[07 Dec 2024, 14:03:48.539] [SUCCESS] Table "users" created successfully!
[07 Dec 2024, 14:03:48.565] [TEST] Table creation test passed

[07 Dec 2024, 14:03:48.566] [SUCCESS] Row inserted into table "users"!
[07 Dec 2024, 14:03:48.566] [SUCCESS] Row inserted into table "users"!
[07 Dec 2024, 14:03:48.566] [SUCCESS] Row inserted into table "users"!
[07 Dec 2024, 14:03:48.567] [SUCCESS] Row inserted into table "users"!
[07 Dec 2024, 14:03:48.567] [SUCCESS] Row inserted into table "users"!
[07 Dec 2024, 14:03:48.567] [TEST] Insert test passed

┌─────────┬─────┬─────────┐
│ (index) │ id  │  name   │
├─────────┼─────┼─────────┤
│    0    │ 101 │ 'ALICE' │
│    1    │ 102 │  'Bob'  │
│    2    │ 103 │ 'John'  │
│    3    │ 104 │  'Tom'  │
│    4    │ 105 │  'MLH'  │
└─────────┴─────┴─────────┘
[07 Dec 2024, 22:29:57.777] [SUCCESS] SELECT Query executed successfully
┌─────────┬─────┬─────────┬─────┬─────────┐
│ (index) │ id  │  name   │ age │ student │
├─────────┼─────┼─────────┼─────┼─────────┤
│    0    │ 101 │ 'ALICE' │ 22  │ 'true'  │
│    1    │ 102 │  'Bob'  │ 25  │ 'true'  │
│    2    │ 103 │ 'John'  │ 32  │ 'false' │
│    3    │ 104 │  'Tom'  │ 28  │ 'true'  │
│    4    │ 105 │  'MLH'  │ 10  │ 'false' │
└─────────┴─────┴─────────┴─────┴─────────┘
[07 Dec 2024, 22:29:57.777] [SUCCESS] SELECT Query executed successfully
[07 Dec 2024, 22:29:57.777] [TEST] Select test passed
```
