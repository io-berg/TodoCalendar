import { getTodos, saveTodosToLocalStorage } from "./todo.js";
import { renderCalendar, getSelectedDate } from "../calendar.js";
import { renderTodoList } from "./renderTodoList.js";

function openEditMode(e, todoDiv) {
  const todoToEdit = getTodos().find(
    (todo) => todo.id == e.target.dataset.todoId
  );

  todoDiv.childNodes.forEach((e) => (e.style.display = "none"));

  const editForm = buildEditForm(todoToEdit);
  todoDiv.appendChild(editForm);
}

function buildEditForm(todo) {
  const editForm = document.createElement("form");
  editForm.classList.add("edit-form");

  const editElements = {
    title: buildTitleInput(todo.title),
    description: buildDescriptionInput(todo.description),
    date: buildDateInput(todo.date.toISOString().split("T")[0]),
    buttons: buildButtons(),
  };

  appendInputs(editForm, editElements);

  editForm.addEventListener("submit", (e) =>
    saveEdit(
      editElements.date.dateEdit.value,
      editElements.title.titleEdit.value,
      editElements.description.descriptionEdit.value,
      todo.id,
      e
    )
  );

  return editForm;
}

function buildTitleInput(title) {
  const titleLabel = document.createElement("label");
  titleLabel.innerText = "Titel:";
  titleLabel.htmlFor = "title";

  const titleEdit = document.createElement("input");
  titleEdit.type = "text";
  titleEdit.name = "title";
  titleEdit.classList.add("titleEdit");
  titleEdit.value = title;
  titleEdit.required = true;

  // Could not get a pattern to block whitespace so this is a workaround
  titleEdit.addEventListener("keyup", (e) => {
    if (e.target.value.trim().length == 0) {
      e.target.value = "";
    }
  });

  return { titleLabel, titleEdit };
}

function buildDescriptionInput(descriptionPlaceholder) {
  const descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Beskrivning:";
  descriptionLabel.htmlFor = "description";

  const descriptionEdit = document.createElement("textarea");
  descriptionEdit.classList.add("descriptionEdit");
  descriptionEdit.name = "description";
  descriptionEdit.value = descriptionPlaceholder;
  descriptionEdit.rows = "3";
  descriptionEdit.cols = "40";

  return { descriptionLabel, descriptionEdit };
}

function buildDateInput(datePlaceholder) {
  const dateLabel = document.createElement("label");
  dateLabel.innerText = "Datum:";
  dateLabel.htmlFor = "date";

  const dateEdit = document.createElement("input");
  dateEdit.type = "date";
  dateEdit.name = "date";
  dateEdit.classList.add("dateEdit");
  dateEdit.value = datePlaceholder;
  dateEdit.required = true;

  return { dateLabel, dateEdit };
}

function buildButtons() {
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

  return btnDiv;
}

function appendInputs(editForm, editElements) {
  editForm.appendChild(editElements.title.titleLabel);
  editForm.appendChild(editElements.title.titleEdit);
  editForm.appendChild(editElements.description.descriptionLabel);
  editForm.appendChild(editElements.description.descriptionEdit);
  editForm.appendChild(editElements.date.dateLabel);
  editForm.appendChild(editElements.date.dateEdit);
  editForm.appendChild(editElements.buttons);
}

function saveEdit(date, title, description, id, event) {
  event.preventDefault();
  const todo = getTodos().find((todo) => todo.id == id);
  todo.date = new Date(date);
  todo.title = title;
  todo.description = description;

  saveTodosToLocalStorage();
  renderTodoList(getSelectedDate());
  renderCalendar();
}

export { openEditMode };
