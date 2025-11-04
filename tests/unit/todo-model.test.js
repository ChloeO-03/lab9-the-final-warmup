import { test } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../../src/models/todo-model.js';

class MockStorage {
  constructor() { this.data = {}; }
  save(key, value) { this.data[key] = value; }
  load(key, defaultValue) { return this.data[key] ?? defaultValue; }
  remove(key) { delete this.data[key]; }
  clear() { this.data = {}; }
}

test('TodoModel adds todo', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Test todo');
  
  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo');
  assert.strictEqual(model.todos[0].completed, false);
});

test('TodoModel ignores empty todos', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('');
  model.addTodo('   ');
  
  assert.strictEqual(model.todos.length, 0);
});

test('TodoModel toggles completion', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Test');
  const id = model.todos[0].id;
  
  model.toggleComplete(id);
  assert.strictEqual(model.todos[0].completed, true);
  
  model.toggleComplete(id);
  assert.strictEqual(model.todos[0].completed, false);
});

test('TodoModel deletes todo', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Todo 1');
  model.addTodo('Todo 2');
  const id = model.todos[0].id;
  
  model.deleteTodo(id);
  
  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Todo 2');
});

test('TodoModel updates todo text', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Original');
  const id = model.todos[0].id;
  
  model.updateTodo(id, 'Updated');
  assert.strictEqual(model.todos[0].text, 'Updated');
});

test('TodoModel clears completed todos', () => {
  const model = new MockStorage();
  model.addTodo('Active');
  model.addTodo('Completed');
  model.toggleComplete(model.todos[1].id);
  
  model.clearCompleted();
  assert.strictEqual(model.todos.length, 1);
});

test('TodoModel counts active and completed', () => {
  const model = new TodoModel(new MockStorage());
  model.addTodo('Todo 1');
  model.addTodo('Todo 2');
  model.addTodo('Todo 3');
  model.toggleComplete(model.todos[0].id);
  
  assert.strictEqual(model.activeCount, 2);
  assert.strictEqual(model.completedCount, 1);
});

test('TodoModel notifies observers', () => {
  const model = new TodoModel(new MockStorage());
  let notified = 0;
  
  model.subscribe(() => notified++);
  model.addTodo('Test');
  
  assert.strictEqual(notified, 1);
});

test('TodoModel persists to storage', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  
  model.addTodo('Persistent');
  
  assert.ok(storage.data.todos);
  assert.strictEqual(storage.data.todos.length, 1);
});

test('TodoModel loads from storage', () => {
  const storage = new MockStorage();
  storage.save('todos', [{ id: 1, text: 'Existing', completed: false }]);
  storage.save('nextId', 2);
  
  const model = new TodoModel(storage);
  
  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Existing');
});