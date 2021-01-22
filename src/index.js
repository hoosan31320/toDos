// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finToDoList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  delBtn.innerText = "X";
  finBtn.innerText = "V";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.addEventListener("click", finishToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function finishToDo(event) {
  const finBtn = event.target;
  const finLi = finBtn.parentNode;
  finBtn.innerText = "<<";
  finToDoList.appendChild(finLi);
  // toDoList.removeChild(finLi);
  finBtn.addEventListener("click", finFinToDo);
}

function finFinToDo(event) {
  const finFinBtn = event.target;
  const finFinLi = finFinBtn.parentNode;
  finFinBtn.innerText = "V";
  toDoList.appendChild(finFinLi);
  // finToDoList.removeChild(dinFinLi);
  // finBtn.addEventListener("click", finishToDo);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
