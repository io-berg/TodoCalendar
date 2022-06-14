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
  renderTodoList();
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

const todoListContainer = document.getElementById("todo-list-container");

function renderTodoList() {
  todoListContainer.innerHTML = "";
  let todoArray = [];

  if (todos.length) {
    todoArray = filterTodosByDate();
    todoArray.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  for (const todo of todoArray) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoListDiv");
    console.log(todo);
    for (const key of Object.keys(todo)) {
      const todoTextField = document.createElement("p");

      if (key == "description") {
        const todoTextFieldValue = document.createElement("p");
        todoTextField.innerHTML = `${key}:`;
        todoTextFieldValue.innerHTML = `${todo[key]}`;
        todoDiv.appendChild(todoTextField);
        todoDiv.appendChild(todoTextFieldValue);
      } else if (key == "date") {
        todoTextField.innerHTML = `${key}: ${todo[key].getFullYear()}-
        ${todo[key].getMonth() + 1}-${todo[key].getDate()}`;
        todoDiv.appendChild(todoTextField);
      } else {
        todoTextField.innerHTML = `${key}: ${todo[key]}`;
        todoDiv.appendChild(todoTextField);
      }
    }
    todoListContainer.appendChild(todoDiv);
  }
}

function filterTodosByDate() {
  const filteredTodoArray = todos.filter((todo) => {
    const currentTime = new Date();
    if (isEarlierDate(todo.date, currentTime)) {
      return todo;
    }
  });

  return filteredTodoArray;
}

function isEarlierDate(todoDate, currentDate) {
  return (
    todoDate.getDate() >= currentDate.getDate() &&
    todoDate.getMonth() >= currentDate.getMonth() &&
    todoDate.getFullYear() >= currentDate.getFullYear()
  );
}

export { renderTodoList };

function getTodos() {
  return todos;
}

export { getTodos };
