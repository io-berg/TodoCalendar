const todos = [];

function addTodos() {
  const inputTitle = document.getElementById("title").value;
  const inputDescription = document.getElementById("description").value;
  const inputDate = document.getElementById("date").value;
  console.log(inputTitle);

  const todo = {
    titel: inputTitle,
    description: inputDescription,
    date: inputDate,
  };

  todos.push(todo);
  console.log(todos);
  hide();
}

function show() {
  document.getElementById("input-block").style.display = "block";
}

function hide() {
  document.getElementById("input-block").style.display = "none";
}

const addButton = document.getElementById("addTodo-button");
addButton.addEventListener("click", show);
const createTodoButton = document.getElementById("createTodo-button");
createTodoButton.addEventListener("click", addTodos);
