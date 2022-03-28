const buttonAdd = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const olTask = document.getElementById('lista-tarefas');

const addTaskTInDOM = (() => {
  const taskList = JSON.parse(localStorage.getItem('tasks'));
  const listLength = taskList.length - 1;
  const task = taskList[listLength];
  const liTask = document.createElement('li');
  liTask.classList = 'list-group-item';
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
});

const listTaskRenderization = (() => {
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
  } else {
    const taskList = JSON.parse(localStorage.getItem('tasks'));
    for (const task of taskList) {
      const liTask = document.createElement('li');
      liTask.innerText = task;
      liTask.classList = 'list-group-item';
      olTask.appendChild(liTask);
    }
  }
});


document.addEventListener('click', (event) => {
  const clicked = event.target;

  if (clicked.classList.contains('btnAddTask')) {
    addTaskToLocalStorage();
  }

  if (clicked.classList.contains('list-group-item')) {
    clicked.style.backgroundColor = 'gray';
    clicked.style.color = 'white';
  }
});

window.onload = () => {
  listTaskRenderization();
};
