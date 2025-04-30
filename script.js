const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const progressText = document.getElementById('progress-text');

let tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(text) {
  const task = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  updateProgress();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    if (task.completed) {
      span.style.textDecoration = 'line-through';
      span.style.opacity = '0.5';
    }

    span.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
      updateProgress();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      updateProgress();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressText.textContent = `${percent}%`; completado;

  const progressBarContainer = document.getElementById('progress-bar-container');
  let bar = progressBarContainer.querySelector('div');
  if (!bar) {
    bar = document.createElement('div');
    progressBarContainer.appendChild(bar);
  }
  bar.style.width = `${percent}%`;
}