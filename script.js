const inputTask = document.getElementById('texto-tarefa');
const olTask = document.getElementById('lista-tarefas');

const addTaskTInDOM = (() => {
  const listTask = JSON.parse(localStorage.getItem('tasks'));
  const listLength = listTask.length - 1;
  const task = listTask[listLength];
  const liTask = document.createElement('li');
  liTask.classList = 'list-group-item task';
  liTask.innerText = task;
  olTask.appendChild(liTask);
  inputTask.value = '';
});

const addTaskToLocalStorage = (() => {
  const listTask = JSON.parse(localStorage.getItem('tasks'));
  const task = inputTask.value;
  listTask.push(task);
  localStorage.setItem('tasks', JSON.stringify(listTask));
  addTaskTInDOM();
  saveList();
});

const listTaskRenderization = (() => {
  if (localStorage.getItem('listSave') === null && localStorage.getItem('listSave') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
    localStorage.setItem('listSave', JSON.stringify(''));
  } else {
    olTask.innerHTML = JSON.parse(localStorage.getItem('listSave'));
  }
});

const selectedTask = ((event) => {
  const clicked = event.target;
  const listTasks = document.getElementsByClassName('task');
  for (const task of listTasks) {
    const cssObj = window.getComputedStyle(task, null);
    const backgroundColor = cssObj.getPropertyValue('background-color');
    if (backgroundColor === 'rgb(128, 128, 128)') {
      task.style.backgroundColor = 'white';
      task.style.color = 'black';
    }
  }
  clicked.style.backgroundColor = 'gray';
  clicked.style.color = 'white';
});

const clearList = (() => {
  while (olTask.firstChild) {
    olTask.removeChild(olTask.firstChild);
  }
  localStorage.clear();
  listTaskRenderization();
});

const removeTasksLocalStorage = ((taskCompleted) => {
  const listTask = JSON.parse(localStorage.getItem('tasks'));
  const pos = listTask.indexOf(taskCompleted);
  listTask.splice(pos, 1);
  localStorage.setItem('tasks', JSON.stringify(listTask));
});

const removeFinisheds = (() => {
  const listTasksCompleted = document.querySelectorAll('.completed');
  if (listTasksCompleted.length === 0) {
    alert('Nenhuma tarefa finalizada!');
  }
  listTasksCompleted.forEach((task) => {
    removeTasksLocalStorage(task.innerText);
    olTask.removeChild(task);
  });
  saveList();
  listTaskRenderization();
});

const taskCompleted = ((event) => {
  const clicked = event.target;
  if (clicked.classList.contains('completed')) {
    clicked.classList.remove('completed');
  } else {
    clicked.classList.add('completed');
  }
});

const saveList = (() => {
  localStorage.setItem('listSave', JSON.stringify(olTask.innerHTML));
});

document.addEventListener('click', (event) => {
  const clicked = event.target;

  if (clicked.classList.contains('btn-add-task')) {
    addTaskToLocalStorage();
  }

  if (clicked.classList.contains('task')) {
    selectedTask(event);
  }

  if (clicked.classList.contains('btn-all-clear')) {
    clearList();
  }

  if (clicked.classList.contains('btn-remove-finished')) {
    removeFinisheds();
  }

  if (clicked.classList.contains('btn-save-list-tasks')) {
    saveList();
  }
});

document.addEventListener('dblclick', (event) => {
  const clicked = event.target;
  if (clicked.classList.contains('task')) {
    taskCompleted(event);
  }
});

window.onload = () => {
  listTaskRenderization();
};
