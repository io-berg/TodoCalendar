import { renderCalender, getSelectedDate, isSameDate } from "./calender.js";

const todos = [];

function addTodos() {
  const inputTitle = document.getElementById("title").value;
  const inputDescription = document.getElementById("description").value;
  const inputDate = document.getElementById("date").value;

  const todo = {
    title: inputTitle,
    description: inputDescription,
    date: new Date(inputDate),
  };

  todos.push(todo);
  renderTodoList(getSelectedDate());
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

function renderTodoList(selectedDate) {
  todoListContainer.innerHTML = "";
  let todoArray = [];
  document.getElementById("todo-list-header").innerHTML = "Dina kommande todos";

  if (todos.length && !selectedDate) {
    todoArray = filterTodosByDate(isEarlierDate);
    todoArray.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  if (selectedDate) {
    document.getElementById(
      "todo-list-header"
    ).innerHTML = `Dina todos på datum: ${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;
    todoArray = todos.filter((todo) => {
      if (isSameDate(todo.date, selectedDate)) {
        return todo;
      }
    });
  }
  for (const todo of todoArray) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoListDiv");
    for (const key of Object.keys(todo)) {
      const todoTextFieldTitle = document.createElement("p");
      const todoTextFieldValue = document.createElement("p");
      todoTextFieldTitle.classList.add("todoListTextTitles");
      if (key == "date") {
        todoTextFieldTitle.innerHTML = "Datum:";
        todoTextFieldValue.innerHTML = `${todo[key].getFullYear()}-${
          todo[key].getMonth() + 1
        }-${todo[key].getDate()}`;
        todoDiv.appendChild(todoTextFieldTitle);
        todoDiv.appendChild(todoTextFieldValue);
      } else if (key == "description") {
        todoTextFieldTitle.innerHTML = "Beskrivning";
        todoTextFieldValue.innerHTML = `${todo[key]}`;
        todoDiv.appendChild(todoTextFieldTitle);
        todoDiv.appendChild(todoTextFieldValue);
      } else if (key == "title") {
        todoTextFieldTitle.innerHTML = "Titel:";
        todoTextFieldValue.innerHTML = `${todo[key]}`;
        todoDiv.appendChild(todoTextFieldTitle);
        todoDiv.appendChild(todoTextFieldValue);
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

function getTodos() {
  return todos;
}

export { renderTodoList, getTodos };
