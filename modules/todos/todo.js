import { renderCalender, getSelectedDate } from "../calender.js";
import { renderTodoList } from "./renderTodoList.js";

const todos = [];

function addTodos(event) {
  event.preventDefault();
  const inputTitle = document.getElementById("title").value;
  const inputDescription = document.getElementById("description").value;
  const inputDate = document.getElementById("date").value;

  const todo = {
    title: inputTitle,
    description: inputDescription,
    date: new Date(inputDate),
    id: new Date().getTime(),
  };

  todos.push(todo);
  saveTodosToLocalStorage();
  renderTodoList(getSelectedDate());
  toggleTodoForm();
  renderCalender();
}

let todoFormVisible = false;

function toggleTodoForm() {
  todoFormVisible = !todoFormVisible;
  let displayStyle = todoFormVisible ? "flex" : "none";

  document.getElementById("input-block").style.display = displayStyle;
}

const addButton = document.getElementById("addTodo-button");
addButton.addEventListener("click", toggleTodoForm);
const createTodoButton = document.getElementById("todo-form");
createTodoButton.addEventListener("submit", addTodos);

function openRemoveMode(e) {
  const todoToRemove = getTodos().find(
    (todo) => todo.id == e.target.dataset.todoId
  );
  if (confirm("Vill du ta bort den här todon?")) {
    removeTodo(todoToRemove);
  }
}

function removeTodo(id) {
  const todo = todos.indexOf(id);
  todos.splice(todo, 1);
  saveTodosToLocalStorage();
  renderTodoList(getSelectedDate());
  renderCalender();
}

function getTodos() {
  return todos;
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todoArray", JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  if (!localStorage.getItem("todoArray")) return;

  todos.push(...JSON.parse(localStorage.getItem("todoArray")));

  for (const todo of todos) {
    const dateFromLS = new Date(todo.date);
    todo.date = dateFromLS;
  }
}

export {
  openRemoveMode,
  getTodos,
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage,
  todos,
};
