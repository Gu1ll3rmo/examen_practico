let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let editedTaskId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let data = JSON.parse(localStorage.getItem("data")) || [];

let formValidation = () => {
  if (textInput.value.trim() === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
  }
};

let acceptData = () => {
  if (editedTaskId !== null) {
    // Edit existing task
    data[editedTaskId] = {
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    };
    editedTaskId = null;
  } else {
    // Add new task
    data.push({
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    });
  }

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.forEach((task, index) => {
    tasks.innerHTML += `
      <div id="${index}">
        <span class="fw-bold">${task.text}</span>
        <span class="small text-secondary">${task.date}</span>
        <p>${task.description}</p>

        <span class="options">
          <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick="deleteTask(${index})" class="fas fa-trash-alt"></i>
        </span>
      </div>
    `;
  });

  resetForm();
};

let deleteTask = (taskId) => {
  data.splice(taskId, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let editTask = (taskId) => {
  const selectedTask = data[taskId];
  textInput.value = selectedTask.text;
  dateInput.value = selectedTask.date;
  textarea.value = selectedTask.description;
  editedTaskId = taskId;
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  editedTaskId = null;
};

(() => {
  console.log(data);
  createTasks();
})();

document.getElementById('deleteAllBtn').addEventListener('click', function () {
  localStorage.removeItem('data');
  data = [];
  console.log(data);
  createTasks();
});
