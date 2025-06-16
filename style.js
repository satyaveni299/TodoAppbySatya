let unorderdListContainer = document.getElementById("todo-list-container");
let addButtonElement = document.getElementById("addTask");

// Load tasks from localStorage or use default tasks
function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('myTasksList');
    const savedCount = localStorage.getItem('todosCount');

    if (savedTasks) {
        return {
            tasks: JSON.parse(savedTasks),
            count: savedCount ? parseInt(savedCount) : 0
        };
    } else {
        // Default tasks if no saved data
        return {
            tasks: [{
                    name: 'Gym',
                    uniqueNo: 1
                },
                {
                    name: 'Feeding Jhonny',
                    uniqueNo: 2
                },
                {
                    name: 'Workig On DSA',
                    uniqueNo: 3
                }
            ],
            count: 3
        };
    }
}

// Save tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem('myTasksList', JSON.stringify(myTasksList));
    localStorage.setItem('todosCount', todosCount.toString());
}

// Load notepad content from localStorage
function loadNotepadFromStorage() {
    const savedNotes = localStorage.getItem('notepadContent');
    return savedNotes || '';
}

// Save notepad content to localStorage
function saveNotepadToStorage(content) {
    localStorage.setItem('notepadContent', content);
    showAutoSaveIndicator();
}

// Show auto-save indicator
function showAutoSaveIndicator() {
    const indicator = document.getElementById('autoSaveIndicator');
    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Initialize tasks and count
const loadedData = loadTasksFromStorage();
let myTasksList = loadedData.tasks;
let todosCount = loadedData.count;

function createAppend(item) {
    let todoId = "todo" + item['uniqueNo'];
    let checkboxId = "checkbox" + item['uniqueNo'];
    let labelId = "label" + item['uniqueNo'];
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("list-style", "d-flex", "flex-row");
    unorderdListContainer.appendChild(todoElement);
    let inputElement = document.createElement("input");
    inputElement.classList.add("checkbox-input")
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    todoElement.appendChild(inputElement);
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("list-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    let LabelElement = document.createElement("label");
    LabelElement.textContent = item['name'];
    LabelElement.classList.add("label-style");
    LabelElement.setAttribute("for", checkboxId);
    LabelElement.id = labelId;
    labelContainer.appendChild(LabelElement);
    inputElement.onclick = function() {
        checkStatusofTodo(checkboxId, labelId);
    }
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-style");
    labelContainer.appendChild(deleteIconContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTodoElement(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}
// Initialize the app
for (let item of myTasksList) {
    createAppend(item);
}

// Initialize notepad
const notepadArea = document.getElementById('notepadArea');
notepadArea.value = loadNotepadFromStorage();

// Auto-save notepad content
let notepadTimeout;
notepadArea.addEventListener('input', function() {
    clearTimeout(notepadTimeout);
    notepadTimeout = setTimeout(() => {
        saveNotepadToStorage(notepadArea.value);
    }, 1000); // Save after 1 second of no typing
});

function checkStatusofTodo(checkboxId, labelId) {
    let label1 = document.getElementById(labelId);
    label1.classList.toggle('changetoDone');
}

function deleteTodoElement(todoId) {
    let tobeDeleted = document.getElementById(todoId);
    unorderdListContainer.removeChild(tobeDeleted);

    // Remove task from array and save to localStorage
    const uniqueNo = parseInt(todoId.replace('todo', ''));
    myTasksList = myTasksList.filter(task => task.uniqueNo !== uniqueNo);
    saveTasksToStorage();
}
addButtonElement.onclick = function() {
    AddNewButton();
}

function AddNewButton() {
    let userTodo = document.getElementById("userInput");
    let userValue = userTodo.value;
    if (userValue === "") {
        alert("Enter a Valid Text");
        return;
    }
    todosCount += 1;
    let newTodo = {
        name: userValue,
        uniqueNo: todosCount
    }
    myTasksList.push(newTodo);
    createAppend(newTodo);
    saveTasksToStorage();
    userTodo.value = "";
}
