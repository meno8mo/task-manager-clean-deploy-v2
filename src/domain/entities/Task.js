class Task {
  constructor({ id, title, description, status, createdAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status || 'PENDING';
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Task;
