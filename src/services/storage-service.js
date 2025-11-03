/**
 * StorageService - Handles localStorage operations for the TODO app
 */
export class StorageService {
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey;
  }

  /**
   * Save data to localStorage
   * @param {string} key - The key to save under
   * @param {*} data - The data to save (will be JSON stringified)
   * @returns {boolean} True if save was successful
   */
  save(key, data) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      localStorage.setItem(fullKey, JSON.stringify(data));
      return;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - The key to load
   * @param {*} defaultValue - Value to return if key doesn't exist
   * @returns {*} The loaded data or defaultValue
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Remove data from localStorage
   * @param {string} key - The key to remove
   * @returns {boolean} True if removal was successful
   */
  remove(key) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
      return false;
    }
  }

  /**
   * Clear all data for this app
   * @returns {boolean} True if clear was successful
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storageKey)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  }
}
