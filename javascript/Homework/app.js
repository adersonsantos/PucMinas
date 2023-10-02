// Model
const model = {
  todos: [id, tarefa], //local storage, db
  delTodo: function (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  },
  addTodo: function (todo) {
    this.todos.push(todo);
  },
  organize: function (todo) {
    this.todos.sort();
  },
};

// View
const view = {
  todoList: document.getElementById("todo-list"),
  renderTodo: function (todo) {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo;
    this.todoList.appendChild(todoItem);
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("click", function (event) {
      if (event.target.id == "adicionar") {
        event.preventDefault();
        const todoInput = document.getElementById("todo-input");
        const todo = todoInput.value;
        if (todo.trim() !== "") {
          model.addTodo(todo);
          model.organize(todo);
          view.renderTodo(todo);
          todoInput.value = "";
        }
      } 
      if (event.target.id == "excluir") {
        event.preventDefault();
        const todoInput = document.getElementById("todo-input");
        const todo = todoInput.value;
        if (todo.trim() !== "") {
          model.delTodo(todo);
          view.renderTodo(todo);
          todoInput.value = "";
        }
      }
    });
  },
};

controller.init();
