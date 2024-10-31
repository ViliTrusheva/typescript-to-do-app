import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}

// console.log(uuidV4());

const list = document.querySelector('.list') as HTMLUListElement;
const form = document.querySelector('.new-task-form') as HTMLFormElement;
const input = document.querySelector('.new-task-title') as HTMLInputElement;
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit" , (e) => {
    e.preventDefault();
    
    if (input?.value == " " || input?.value == null) return

const newTask: Task = {
  id: uuidV4(),
  title: input.value,
  completed: true,
  createdAt: new Date()
}
tasks.push(newTask);

addListItem(newTask);
input.value = " "
} ); 

function addListItem(task: Task) {
  const item = document.createElement('li');
const label = document.createElement('label');
const checkbox = document.createElement('input');
checkbox.addEventListener('change', () => {
  task.completed = checkbox.checked;
  console.log(tasks);
  saveTasks();
  
})
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
label.append(checkbox, task.title);
item.append(label);
list.append(item);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('tasks');
  if (taskJSON === null) return [];
  const tasks: Task[] = JSON.parse(taskJSON);
  return tasks;
}