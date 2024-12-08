// index.js

// Storage
export { getTableFilePath, readJSON, writeJSON } from "./lib/storage.js";

// Schema
export { createTable } from "./lib/schema.js";

// Queries
export { insertInto, select } from "./lib/query.js";

// Indexing
export { createIndex, searchWithIndex } from "./lib/indexing.js";

// Backup
export { backupDatabase, restoreDatabase } from "./lib/backup.js";

// Locks
export { lockTable, performWithLock } from "./lib/locks.js";
