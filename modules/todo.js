const todos = [];

function addTodos() {
  const inputTitle = document.getElementById("title").value;
  const inputDescription = document.getElementById("description").value;
  const inputDate = document.getElementById("date").value;

  const todo = {
    titel: inputTitle,
    description: inputDescription,
    date: inputDate,
  };

  todos.push(todo);
  renderTodoList();
  toggleTodoForm();
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
  for (const todo of todos) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoListDiv");
    for (const key of Object.keys(todo)) {
      const todoTextField = document.createElement("p");
      if (key == "description") {
        const todoTextFieldValue = document.createElement("p");
        todoTextField.innerHTML = `${key}:`;
        todoTextFieldValue.innerHTML = `${todo[key]}`;
        todoDiv.appendChild(todoTextField);
        todoDiv.appendChild(todoTextFieldValue);
      } else {
        todoTextField.innerHTML = `${key}: ${todo[key]}`;
        todoDiv.appendChild(todoTextField);
      }
    }
    todoListContainer.appendChild(todoDiv);
  }
}

renderTodoList();
