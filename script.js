const buttonAdd = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const olTask = document.getElementById('lista-tarefas');

const addTaskTInDOM = (() => {
  const taskList = JSON.parse(localStorage.getItem('tasks'));
  const listLength = taskList.length - 1;
  const task = taskList[listLength];
  const liTask = document.createElement('li');
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
      olTask.appendChild(liTask);
    }
  }
});

buttonAdd.addEventListener('click', addTaskToLocalStorage);

window.onload = () => {
  listTaskRenderization();
};
