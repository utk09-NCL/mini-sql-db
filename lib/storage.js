// lib/storage.js
/**
 * @module storage
 * @description Handles file-based storage operations
 */

import fs from "fs";
import "dotenv/config";
import { logError, logInfo } from "../logger/logger.js";
import path from "path";

// Path to the database file
export const DATABASE_PATH = process.env.MINI_SQL_DB_PATH || "./database/";

// create the database directory if it doesn't exist
if (!fs.existsSync(DATABASE_PATH)) {
  fs.mkdirSync(DATABASE_PATH, { recursive: true });
  logInfo(`Database directory created: ${DATABASE_PATH}`);
}

/**
 * Gets the file path for a table's schema or data file
 * @param {string} tableName - The name of the table.
 * @param {string} fileType - The type of file (schema or data).
 * @returns {string} - The file path
 */
export function getTableFilePath(tableName, fileType = "data") {
  return path.join(DATABASE_PATH, `${tableName}.${fileType}.json`);
}

/**
 * Reads a JSON file and returns its contents.
 * @param {string} filePath - Path to the JSON file
 * @returns {object|null} - Parsed JSON content or null if the file doesn't exist
 */
export function readJSON(filePath) {
  const parsedData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : null;
  if (!parsedData) {
    logError(`File not found: ${filePath}`);
  }
  return parsedData;
}

/**
 * Writes data to a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {object} data - Data to write
 */
export function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  // TODO: Homework - Write validation for filePath and return error if not found
}
