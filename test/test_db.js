import pc from "picocolors";
import assert from "assert";
import { logger } from "../logger/logger.js";
import { createTable } from "../lib/schema.js";
import { insertInto, select } from "../lib/query.js";
import { createIndex, searchWithIndex } from "../lib/indexing.js";
import { backupDatabase, restoreDatabase } from "../lib/backup.js";
import { performWithLock } from "../lib/locks.js";

function testCreateTable_v1() {
  const createTableQuery = "CREATE TABLE users (id int, name txt, age int, student boolean)";
  try {
    createTable(createTableQuery);
    logger("[TEST]", pc.magenta, console.info, "Table creation test passed\n");
  } catch (error) {
    logger("[TEST]", pc.red, console.error, "Table creation test failed\n", error);
  }
}

function testInsertInto_v1() {
  const insertQuery_1 =
    'INSERT INTO users (id, name, age, student) VALUES (101, "Alice", 22, true)';
  const insertQuery_2 = 'INSERT INTO users (id, name, age, student) VALUES (102, "Bob", 25, true)';
  const insertQuery_3 =
    'INSERT INTO users (id, name, age, student) VALUES (103, "John", 32, false)';
  const insertQuery_4 = 'INSERT INTO users (id, name, age, student) VALUES (104, "Tom", 28, true)';
  const insertQuery_5 = 'INSERT INTO users (id, name, age, student) VALUES (105, "MLH", 10, false)';
  const insertQuery_6 = 'INSERT INTO users (id, name, age, student) VALUES (106, "GHW", 10, false)';
  try {
    insertInto(insertQuery_1);
    insertInto(insertQuery_2);
    insertInto(insertQuery_3);
    insertInto(insertQuery_4);
    insertInto(insertQuery_5);
    insertInto(insertQuery_6);
    logger("[TEST]", pc.magenta, console.info, "Insert test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Insert test failed\n", error);
  }
}

function testSelect_v1() {
  const selectQuery_1 = "SELECT id, name from users";
  const selectQuery_2 = "SELECT * from users";
  try {
    select(selectQuery_1);
    select(selectQuery_2);
    logger("[TEST]", pc.magenta, console.info, "Select test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Select test failed\n", error);
  }
}

function testCreateIndex_v1() {
  try {
    createIndex("users", "name");
    createIndex("users", "age");
    logger("[TEST]", pc.magenta, console.info, "Create Index test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Create Index test failed\n", error);
  }
}

function testSearchWithIndex_v1() {
  try {
    searchWithIndex("users", "name", "John");
    searchWithIndex("users", "age", 10);
    logger("[TEST]", pc.magenta, console.info, "Search Index test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Search Index test failed\n", error);
  }
}

function testBackupDatabase_v1() {
  try {
    backupDatabase("./backup");
    logger("[TEST]", pc.magenta, console.info, "Backup DB test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Backup DB test failed\n", error);
  }
}

function testRestoreDatabase_v1() {
  try {
    restoreDatabase("./backup");
    logger("[TEST]", pc.magenta, console.info, "Restore DB test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Restore DB test failed\n", error);
  }
}

async function testLocks_v1() {
  try {
    const insertQueries = [
      'INSERT INTO users (id, name, age, student) VALUES (107, "Eve", 23, true)',
      'INSERT INTO users (id, name, age, student) VALUES (108, "Josh", 29, false)',
    ];

    const performInsert = (query, taskName) =>
      performWithLock("users", async () => {
        logger("[TEST]", pc.magenta, console.info, `${taskName} started`);
        insertInto(query);

        await new Promise((res) => setTimeout(res, 5000)); // 5 seconds
        logger("[TEST]", pc.magenta, console.info, `${taskName} completed`);
      });

    const promises = [
      performInsert(insertQueries[0], "Task 1"),
      performInsert(insertQueries[1], "Task 2"),
    ];

    await Promise.allSettled(promises);

    // Verify that both records have been inserted
    const selectQueries = ["SELECT * FROM users"];

    selectQueries.forEach((query) => select(query));

    logger("[TEST]", pc.magenta, console.info, "Locks test passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Locks test failed\n", error);
  }
}

function testAggregations_v1() {
  try {
    const aggregationQueries = [
      {
        query: "SELECT COUNT(*) AS total_users FROM users",
        expected: { total_users: 8 }, // 6 initial inserts + 2 concurrent inserts from testLocks_v1()
      },
      {
        query: "SELECT COUNT(age) AS age_count FROM users",
        expected: { age_count: 8 }, // All rows have age defined
      },
      {
        query: "SELECT AVG(age) AS average_age FROM users",
        expected: { average_age: 22.375 }, // (22 + 25 + 32 + 28 + 10 + 10 + 23 + 29) / 8
      },
      {
        query: "SELECT AVG(age) AS average_age_more_than_10 FROM users WHERE age > 10",
        expected: { average_age_more_than_10: 26.5 }, // (22 + 25 + 32 + 28 + 23 + 29) / 6
      },
    ];

    for (const agg of aggregationQueries) {
      const result = select(agg.query);
      const key = Object.keys(agg.expected)[0];
      const actual = parseFloat(result[0][key]);
      const expected = agg.expected[key];
      assert.strictEqual(
        actual,
        expected,
        `Aggregation "${key}" expected to be "${expected}" but got "${actual}"`,
      );
      logger("[TEST]", pc.magenta, console.info, `Aggregation test for "${key}" passed\n`);
    }

    logger("[TEST]", pc.magenta, console.info, "Aggregation tests passed\n");
  } catch (error) {
    logger("[TEST]", pc.magenta, console.error, "Aggregation tests failed\n", error);
  }
}

export const main = async () => {
  testCreateTable_v1();
  testInsertInto_v1();
  testSelect_v1();
  testCreateIndex_v1();
  testSearchWithIndex_v1();
  testBackupDatabase_v1();
  testRestoreDatabase_v1();
  await testLocks_v1();
  testAggregations_v1();
};

main();
