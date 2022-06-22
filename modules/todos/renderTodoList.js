import { openEditMode } from "./editMode.js";
import { openRemoveMode, todos } from "./todo.js";
import { isSameDate } from "../calender.js";

const todoListContainer = document.getElementById("todo-list-container");

function renderTodoList(selectedDate) {
  todoListContainer.innerHTML = "";
  let todoArray = [];
  document.getElementById("todo-list-header").innerText = "Dina kommande todos";

  if (todos.length && !selectedDate) {
    todoArray = filterTodosByDate(isEarlierDate);
    todoArray.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  if (selectedDate) {
    document.getElementById(
      "todo-list-header"
    ).innerText = `Dina todos på datum: ${refactorDateIntoYYMMDD(
      selectedDate
    )}`;
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
      if (key == "date") {
        buildTodoListField(
          "Datum:",
          refactorDateIntoYYMMDD(todo[key]),
          todoDiv
        );
      } else if (key == "description" && todo[key]) {
        buildTodoListField("Beskrivning:", todo[key], todoDiv);
      } else if (key == "title") {
        const todoHeader = document.createElement("div");
        todoHeader.classList.add("todoHeaderDiv");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("todoTitleDiv");
        buildTodoListField("Titel:", todo[key], titleDiv);

        todoHeader.appendChild(titleDiv);

        todoHeader.appendChild(buildEditAndRemoveButtonDiv(todo, todoDiv));

        todoDiv.appendChild(todoHeader);
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
  todoDate = new Date(
    todoDate.getFullYear(),
    todoDate.getMonth(),
    todoDate.getDate()
  );
  currentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return currentDate <= todoDate;
}

function refactorDateIntoYYMMDD(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function buildTodoListField(title, value, parentDiv) {
  const todoTextFieldTitle = document.createElement("p");
  const todoTextFieldValue = document.createElement("p");
  todoTextFieldTitle.classList.add("todoListTextTitles");
  todoTextFieldTitle.innerText = title;
  todoTextFieldValue.innerText = value;
  parentDiv.appendChild(todoTextFieldTitle);
  parentDiv.appendChild(todoTextFieldValue);
}

function buildEditAndRemoveButtonDiv(todo, todoDiv) {
  const todoBtnDiv = document.createElement("div");
  todoBtnDiv.classList.add("todoBtnDiv");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-edit");
  editIcon.dataset.todoId = todo.id;
  editIcon.addEventListener("click", (e) => openEditMode(e, todoDiv));

  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-trash-can");
  removeIcon.dataset.todoId = todo.id;
  removeIcon.addEventListener("click", (e) => openRemoveMode(e, todoDiv));

  todoBtnDiv.appendChild(editIcon);
  todoBtnDiv.appendChild(removeIcon);
  return todoBtnDiv;
}

export { renderTodoList };
