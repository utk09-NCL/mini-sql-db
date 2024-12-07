// lib/query.js
/**
 * @module query
 * @description Parses and executes SQL queries
 */

import { logError, logSuccess } from "../logger/logger.js";
import { getTableFilePath, readJSON, writeJSON } from "./storage.js";

/**
 * Inserts a row into a table.
 * @param {string} query - SQL query to insert data
 */
export function insertInto(query) {
  const match = query.match(/INSERT INTO (\w+) \((.+)\) VALUES \((.+)\)/i);
  if (!match) {
    logError("Invalid INSERT INTO query");
    throw new Error("Invalid INSERT INTO query");
    // TODO: Homework - make it smart by checking what is missing in the query.
    // TODO: Homework - make it case insensitive
  }

  const tableName = match[1];
  const columns = match[2].split(",").map((col) => col.trim());
  const values = match[3].split(",").map((val) => val.trim().replace(/'/g, "").replace(/"/g, ""));
  const schema = readJSON(getTableFilePath(tableName, "schema"));
  const data = readJSON(getTableFilePath(tableName, "data"));

  if (!schema || !data) {
    logError(`Table "${tableName}" does not exist`);
    throw new Error(`Table "${tableName}" does not exist`);
  }

  const row = {};
  columns.forEach((col, index) => {
    if (!schema[col]) {
      logError(`Column "${col}" does not exist in table "${tableName}"`);
      throw new Error(`Column "${col}" does not exist in table "${tableName}"`);
    }
    row[col] = schema[col] === "INT" ? parseInt(values[index], 10) : values[index];
  });
  data.push(row);
  writeJSON(getTableFilePath(tableName, "data"), data);
  logSuccess(`Row inserted into table "${tableName}"!`);
}

/**
 * Selects rows from a table based on a query
 * @param {string} query - SQL query to select data
 */
export function select(query) {
  const match = query.match(/SELECT (.+) FROM (\w+)/i);
  if (!match) {
    logError("Invalid SELECT query");
    throw new Error("Invalid SELECt query");
  }

  const columns = match[1].split(",").map((col) => col.trim());
  const tableName = match[2];

  const data = readJSON(getTableFilePath(tableName, "data"));
  if (!data) {
    logError(`Table "${tableName}" does not exist`);
    throw new Error(`Table "${tableName}" does not exist`);
  }

  const filteredData = data;

  const result = filteredData.map((row) => {
    if (columns[0] === "*") {
      return row;
    }
    const selectedRow = {};
    columns.forEach((col) => (selectedRow[col] = row[col]));
    return selectedRow;
  });

  console.table(result);
  logSuccess("SELECT Query executed successfully");
}
