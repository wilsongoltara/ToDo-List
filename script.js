const inputTask = document.getElementById('texto-tarefa');
const olTask = document.getElementById('lista-tarefas');

const saveList = (() => {
  localStorage.setItem('listSave', JSON.stringify(olTask.innerHTML));
});

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
  if (localStorage.getItem('listSave') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
    localStorage.setItem('listSave', JSON.stringify(''));
  } else {
    olTask.innerHTML = JSON.parse(localStorage.getItem('listSave'));
  }
});

const selectedTask = ((event) => {
  const clicked = event.target;
  const listTasks = document.getElementsByClassName('task');
  for (let index = 0; index < listTasks.length; index += 1) {
    if (listTasks[index].classList.contains('gray')) {
      listTasks[index].classList.remove('gray');
    }
  }
  clicked.classList.add('gray');
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

const searchIndex = (() => {
  const liTask = document.getElementsByClassName('task');
  for (let index = 0; index < liTask.length; index += 1) {
    if (liTask[index].className.includes('gray')) {
      return index;
    }
  }
});

const moveUp = (() => {
  const indexOfTaskSelected = searchIndex();
  const liTask = document.getElementsByClassName('task');
  if (indexOfTaskSelected === undefined) {
    return null;
  }
  if (indexOfTaskSelected === 0) {
    return null;
  }

  const taskSelected = liTask[indexOfTaskSelected];
  const placeToReturnTask = liTask[indexOfTaskSelected - 1];
  olTask.insertBefore(taskSelected, placeToReturnTask);
});

const moveDown = (() => {
  const indexOfTaskSelected = searchIndex();
  const liTask = document.getElementsByClassName('task');
  if (indexOfTaskSelected === undefined) {
    return null;
  }

  const placeToReturnTask = liTask[indexOfTaskSelected + 1];
  const taskSelected = liTask[indexOfTaskSelected];
  if (placeToReturnTask === undefined) {
    return null;
  }
  olTask.insertBefore(taskSelected, placeToReturnTask.nextElementSibling);
});

const removeSelected = (() => {
  const selected = document.querySelector('.gray');
  olTask.removeChild(selected);
});

document.getElementById('criar-tarefa').addEventListener('click', addTaskToLocalStorage);
document.getElementById('salvar-tarefas').addEventListener('click', saveList);
document.getElementById('mover-cima').addEventListener('click', moveUp);
document.getElementById('mover-baixo').addEventListener('click', moveDown);
document.getElementById('remover-selecionado').addEventListener('click', removeSelected);
document.getElementById('remover-finalizados').addEventListener('click', removeFinisheds);
document.getElementById('apaga-tudo').addEventListener('click', clearList);

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.classList.contains('task')) {
    selectedTask(event);
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
