document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput')
  const addBtn = document.getElementById('addBtn')
  const taskList = document.getElementById('taskList')

  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTasks()

  addBtn.addEventListener('click', addTask)
  taskInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') addTask()
    addBtn.disabled = !taskInput.value.trim()
  });

  function addTask() {
    const text = taskInput.value.trim()
    if (!text) return
    tasks.push({ id: Date.now(), text, done: false })
    saveAndRender()
    taskInput.value = ''
    addBtn.disabled = true
  }

  function toggleDone(id) {
    tasks = tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    )
    saveAndRender()
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id)
    saveAndRender()
  }

  function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
  }

  function renderTasks() {
    taskList.innerHTML = ''
    tasks.forEach(task => {
      const li = document.createElement('li')
      li.className = 'task-item' + (task.done ? ' done' : '')

      const cb = document.createElement('input')
      cb.type = 'checkbox'
      cb.checked = task.done;
      cb.addEventListener('change', () => toggleDone(task.id))

      const span = document.createElement('span')
      span.textContent = task.text

      const del = document.createElement('button')
      del.className = 'delete-btn'
      del.innerHTML = '&times;'
      del.addEventListener('click', () => deleteTask(task.id))

      li.append(cb, span, del)
      taskList.append(li)
    })
  }
})