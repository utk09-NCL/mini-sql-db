// lib/mutex.js
/**
 * @module mutex
 * @description Implements a mutex for managing exclusive access to resources.
 */

import { logDebug } from "../logger/logger.js";

class Mutex {
  constructor() {
    this._queue = [];
    this._locked = false;
  }

  lock() {
    return new Promise((resolve) => {
      const tryAcquire = () => {
        if (!this._locked) {
          this._locked = true;
          logDebug("[MUTEX] Lock acquired.");

          resolve(this.unlock.bind(this));
        } else {
          logDebug("[MUTEX] Lock busy, request queued");
          this._queue.push(tryAcquire);
        }
      };

      tryAcquire();
    });
  }

  unlock() {
    if (this._queue.length > 0) {
      logDebug("[MUTEX] Passing the lock to the next function in the queue");

      this._locked = false;

      const next = this._queue.shift();

      next();
    } else {
      logDebug("[MUTEX] Lock released");
      this._locked = false;
    }
  }
}

export default Mutex;
