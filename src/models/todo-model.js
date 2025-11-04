/**
 * TodoModel - Manages the todo list data and business logic
 * Implements the Observer pattern for reactive updates
 * @class
 */
export class TodoModel {
  constructor(storageService) {
    this.storage = storageService;
    this.todos = this.storage.load('todos', []);
    this.listeners = [];
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Subscribe to model changes
   * @param {Function} observer - Callback function
   */
  subscribe(observer) {
    this.observers.push(observer);
  }

  /**
   * Notify all subscribers of changes
   */
  notify() {
    this.observers.forEach(observer => observer());
  }

  /**
   * Add a new todo
   * @param {string} text - Todo text
   */
  addTodo(text) {
    if (!text || !text.trim()) {
      return;
    }

    this.todos.push({
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()

    });
  

    this.save();
    this.notify();
  }

  /**
   * Toggle todo completion status
   * @param {number} id - Todo ID
   */
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.notify();
    }
  }

  /**
   * Delete a todo
   * @param {number} id - Todo ID
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.notify();
  }

  /**
   * Update todo text
   * @param {number} id - Todo ID
   * @param {string} newText - New text
   */
  updateTodo(id, newText) {
    if (!newText || !newText.trim()) return;

    const todo = this.todos.find(t=> t.id === id);
    if(todo) {
      todo.text = newText.trim();
      this.save();
      this.notify();
    }
  }

  /**
   * Clear all completed todos
   */
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.notify();
  }

  /**
   * Clear all todos
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Get active todo count
   */
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Get completed todo count
   */
  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Save todos to storage
   */
  save() {
    this.storage.save('todos', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}
