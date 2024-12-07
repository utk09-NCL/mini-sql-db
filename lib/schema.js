// lib/schema.js
/**
 * @module schema
 * @description Handles table schema management and validation
 */

import { logError, logSuccess } from "../logger/logger.js";
import { getTableFilePath, writeJSON } from "./storage.js";

/**
 * Creates a new table schema and initialises the data file
 * @param {string} query - SQL query to create a table
 */
export function createTable(query) {
  const match = query.match(/CREATE TABLE (\w+) \((.+)\)/i);

  if (!match) {
    logError("Invalid CREATE TABLE query");
    throw new Error("Invalid CREATE TABLE query");
  }

  const tableName = match[1];
  if (tableName.toLowerCase() === "tables") {
    logError("Cannot create a table named 'tables'");
    throw new Error("Cannot create a table named 'tables'");
  }
  if (tableName.toLowerCase() === "columns") {
    logError("Cannot create a table named 'columns'");
    throw new Error("Cannot create a table named 'columns'");
  }

  const columns = match[2].split(",").map((col) => col.trim());

  const schema = columns.reduce((acc, col) => {
    const [name, type] = col.split(" ");
    if (!name || !type) {
      logError("Invalid column definition");
      throw new Error("Invalid column definition");
    }

    acc[name] = type.toUpperCase();
    return acc;
  }, {});

  const schemaPath = getTableFilePath(tableName, "schema");
  const dataPath = getTableFilePath(tableName, "data");

  writeJSON(schemaPath, schema);
  writeJSON(dataPath, []);
  logSuccess(`Table "${tableName}" created successfully!`);
}
