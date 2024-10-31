import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}

// console.log(uuidV4());

const list = document.querySelector('#task-list') as HTMLUListElement;
const form = document.querySelector('#new-task-form') as HTMLFormElement;
const input = document.querySelector('#new-task-title') as HTMLInputElement;
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit" , (e) => {
    e.preventDefault();
    
    if (input?.value.trim() === "") return;

const newTask: Task = {
  id: uuidV4(),
  title: input.value.trim(),
  completed: true,
  createdAt: new Date()
};
tasks.push(newTask);

addListItem(newTask);
input.value = "";
}); 

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
  task.completed = checkbox.checked;
  console.log(tasks);
  saveTasks();
});
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
  try {
    const tasks: Task[] = JSON.parse(taskJSON);
    return tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt)
    })).filter(task => validateTask(task));
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

function validateTask(task: any): task is Task {
  return typeof task.id === 'string' &&
         typeof task.title === 'string' &&
         typeof task.completed === 'boolean' &&
         task.createdAt instanceof Date;
}