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
        todoTextFieldValue.classList.add("todoDateValue");
        todoDiv.appendChild(todoTextFieldTitle);
        todoDiv.appendChild(todoTextFieldValue);
      } else if (key == "description") {
        todoTextFieldTitle.innerHTML = "Beskrivning";
        todoTextFieldValue.innerHTML = `${todo[key]}`;
        todoTextFieldValue.classList.add("todoDescriptionValue");
        todoDiv.appendChild(todoTextFieldTitle);
        todoDiv.appendChild(todoTextFieldValue);
      } else if (key == "title") {
        const todoHeader = document.createElement("div");
        todoHeader.classList.add("todoHeaderDiv");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("todoTitleDiv");
        todoTextFieldTitle.innerHTML = "Titel:";
        todoTextFieldValue.innerHTML = `${todo[key]}`;
        todoTextFieldValue.classList.add("todoTitleValue");
        titleDiv.appendChild(todoTextFieldTitle);
        titleDiv.appendChild(todoTextFieldValue);

        todoHeader.appendChild(titleDiv);

        const todoBtnDiv = document.createElement("div");
        todoBtnDiv.classList.add("todoBtnDiv");

        const editIcon = document.createElement("i");
        editIcon.classList.add("fas", "fa-edit");
        editIcon.dataset.todoId = todo.id;
        todoBtnDiv.addEventListener("click", (e) => openEditMode(e, todoDiv));

        todoBtnDiv.appendChild(editIcon);
        todoHeader.appendChild(todoBtnDiv);

        todoDiv.appendChild(todoHeader);
      }
    }
    todoListContainer.appendChild(todoDiv);
  }
}

function openEditMode(e, todoDiv) {
  console.log(todoDiv.childNodes);
  todoDiv.childNodes.forEach((e) => (e.style.display = "none"));

  const editDiv = document.createElement("div");
  editDiv.classList.add("editDiv");

  const titleLabel = document.createElement("label");
  titleLabel.innerHTML = "Titel:";
  const titleEdit = document.createElement("input");
  titleEdit.classList.add("titleEdit");
  titleEdit.value = todoDiv.querySelector(".todoTitleValue").innerHTML;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.innerHTML = "Beskrivning:";
  const descriptionEdit = document.createElement("textarea");
  descriptionEdit.classList.add("descriptionEdit");
  descriptionEdit.value = todoDiv.querySelector(
    ".todoDescriptionValue"
  ).innerHTML;
  descriptionEdit.rows = "3";
  descriptionEdit.cols = "40";

  const dateLabel = document.createElement("label");
  dateLabel.innerHTML = "Datum:";
  const dateEdit = document.createElement("input");
  dateEdit.type = "date";
  const dateValue = todoDiv.querySelector(".todoDateValue").innerHTML;
  if (dateValue.split("-")[1].length == 1) {
    dateEdit.value = `${dateValue.split("-")[0]}-0${dateValue.split("-")[1]}-${
      dateValue.split("-")[2]
    }`;
  } else {
    dateEdit.value = dateValue;
  }
  dateEdit.classList.add("dateEdit");

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("editmodeBtnDiv");

  const returnBtn = document.createElement("button");
  returnBtn.innerHTML = "Återgå";
  returnBtn.classList.add("returnBtn");
  returnBtn.addEventListener("click", () => {
    renderTodoList(getSelectedDate());
  });

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("saveBtn");
  saveBtn.innerHTML = "Spara";

  btnDiv.appendChild(returnBtn);
  btnDiv.appendChild(saveBtn);

  const todoId = e.target.dataset.todoId;
  saveBtn.addEventListener("click", () =>
    saveEdit(dateEdit.value, titleEdit.value, descriptionEdit.value, todoId)
  );

  editDiv.appendChild(titleLabel);
  editDiv.appendChild(titleEdit);
  editDiv.appendChild(descriptionLabel);
  editDiv.appendChild(descriptionEdit);
  editDiv.appendChild(dateLabel);
  editDiv.appendChild(dateEdit);
  editDiv.appendChild(btnDiv);
  todoDiv.appendChild(editDiv);
}

function saveEdit(date, title, description, id) {
  const todo = todos.find((todo) => todo.id == id);
  todo.date = new Date(date);
  todo.title = title;
  todo.description = description;
  saveTodosToLocalStorage();
  renderTodoList(getSelectedDate());
  renderCalender();
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

export { renderTodoList, getTodos, loadTodosFromLocalStorage };
