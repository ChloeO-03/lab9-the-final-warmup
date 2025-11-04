import { test } from 'node:test';
import assert from 'node:assert';
import { StorageService } from '../../src/services/storage-service.js';

// Mock localStorage
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  removeItem(key) { delete this.store[key]; },
  key(index) { return Object.keys(this.store)[index] || null; },
  get length() { return Object.keys(this.store).length; },
  clear() { this.store = {}; }
};

test('StorageService saves and loads data', () => {
  const storage = new StorageService('test');
  storage.save('key', { data: 'value' });
  
  const loaded = storage.load('key');
  assert.deepStrictEqual(loaded, { data: 'value' });
});

test('StorageService returns default when key missing', () => {
  const storage = new StorageService('test');
  const result = storage.load('missing', 'default');
  assert.strictEqual(result, 'default');
});

test('StorageService removes data', () => {
  const storage = new StorageService('test');
  storage.save('key', 'data');
  storage.remove('key');
  
  assert.strictEqual(storage.load('key'), null);
});

test('StorageService clears all app data', () => {
  const storage = new StorageService('test');
  storage.save('key1', 'data1');
  storage.save('key2', 'data2');
  storage.clear();
  
  assert.strictEqual(storage.load('key1'), null);
  assert.strictEqual(storage.load('key2'), null);
});

test('StorageService uses correct prefix', () => {
  const storage = new StorageService('myapp');
  storage.save('key', 'value');
  
  const hasKey = Object.keys(localStorage.store)
    .some(k => k.startsWith('myapp_'));
  assert.ok(hasKey);
});