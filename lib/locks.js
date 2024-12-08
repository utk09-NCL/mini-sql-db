// lib/locks.js
/**
 * @module locks
 * @description Implements table-level locking using Mutex
 */

import { logError, logInfo } from "../logger/logger.js";
import Mutex from "./mutex.js";

const tableLocks = new Map();

/**
 * Acquires a lock for a table
 * @param {string} tableName - The name of the table to lock
 * @returns {Promise<Function>} - A promise that resolves to an unlock function
 */
export async function lockTable(tableName) {
  if (!tableLocks.has(tableName)) {
    tableLocks.set(tableName, new Mutex());
    logInfo(`[Lock] Mutex created for table "${tableName}"`);
  }
  const mutex = tableLocks.get(tableName);
  const unlock = await mutex.lock();
  logInfo(`[Lock] Lock acquired for table "${tableName}"`);
  return unlock;
}

/**
 * Executes a callback function with a table lock
 * @param {string} tableName - The name of the table to lock
 * @param {Function} callback - The operation to execute when the table is locked
 */
export async function performWithLock(tableName, callback) {
  const unlock = await lockTable(tableName);
  try {
    logInfo(`[Lock] Performing operation on table "${tableName}"`);
    await callback();
  } catch (error) {
    logError(`[Lock] Error during operation on table "${tableName}"`, error);
    throw error;
  } finally {
    unlock();
    logInfo(`[Lock] Lock released for table "${tableName}"`);
  }
}
