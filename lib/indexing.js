// lib/indexing.js
/**
 * @module indexing
 * @description Implements indexing and optimised lookups
 */

import { logError, logInfo, logSuccess } from "../logger/logger.js";
import { getTableFilePath, readJSON, writeJSON } from "./storage.js";

/**
 * Creates an index on a specific column of a table
 * @param {string} tableName - The name of the table
 * @param {string} column - The column to index
 */
export function createIndex(tableName, column) {
  const dataPath = getTableFilePath(tableName, "data");
  const indexPath = getTableFilePath(tableName, `${column}.index`);

  const data = readJSON(dataPath);
  if (!data) {
    logError(`Table "${tableName}" does not exist`);
    throw new Error(`Table "${tableName}" does not exist`);
  }

  const index = {};
  data.forEach((row, i) => {
    const key = row[column];
    if (!index[key]) {
      index[key] = [];
    }
    index[key].push(i);
  });

  writeJSON(indexPath, index);
  logSuccess(`Index created on column: "${column}" of table "${tableName}"`);
}

/**
 * Searches for rows in a table using an index
 * @param {string} tableName - Name of the table
 * @param {string} column - Column to search
 * @param {string|number|boolean} value - Value to search for
 * @returns {Array<object>} The matching rows
 */
export function searchWithIndex(tableName, column, value) {
  const dataPath = getTableFilePath(tableName, "data");
  const indexPath = getTableFilePath(tableName, `${column}.index`);

  const data = readJSON(dataPath);
  if (!data) {
    logError(`Table "${tableName}" does not exist`);
    throw new Error(`Table "${tableName}" does not exist`);
  }

  const index = readJSON(indexPath);
  if (!index) {
    logError(`Index on column: "${column}" does not exist for table "${tableName}"`);
    throw new Error(`Index on column: "${column}" does not exist for table "${tableName}"`);
  }
  // TODO: Homework - Instead of error, search through the table data if index does not exist on the column

  const positions = index[value];
  if (!positions) {
    logError(`No matching rows found for value: "${value}" in table "${tableName}"`);
    throw new Error(`No matching rows found for value: "${value}" in table "${tableName}"`);
  }

  const rows = positions.map((pos) => data[pos]);
  logInfo(`Found matching rows for "${value}" in table "${tableName}":`, rows);
  return rows;
}
