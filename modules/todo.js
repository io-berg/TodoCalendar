import { renderCalender } from "./calender.js";

const todos = [];

function addTodos() {
  const inputTitle = document.getElementById("title").value;
  const inputDescription = document.getElementById("description").value;
  const inputDate = document.getElementById("date").value;

  const todo = {
    titel: inputTitle,
    description: inputDescription,
    date: new Date(inputDate),
  };

  todos.push(todo);
  toggleTodoForm();
  renderCalender();
}

let todoFormVisible = false;

function toggleTodoForm() {
  todoFormVisible = !todoFormVisible;
  let displayStyle = todoFormVisible ? "block" : "none";

  document.getElementById("input-block").style.display = displayStyle;
}

const addButton = document.getElementById("addTodo-button");
addButton.addEventListener("click", toggleTodoForm);
const createTodoButton = document.getElementById("createTodo-button");
createTodoButton.addEventListener("click", addTodos);

function getTodos() {
  return todos;
}

export { getTodos };
