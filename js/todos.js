let todos = JSON.parse(localStorage.getItem('todos')) || [];

class Todo {
    name;
    description;
    remindDate;
    dueDate;
    category;
    id;

    done = false;

    constructor(name, description = '', remindDate = '', dueDate, catgory = 'main', id) {
        this.name = name;
        this.description = description;
        this.remindDate = remindDate;
        this.dueDate = dueDate;
        this.category = catgory;
        this.id = id;
    }
}

// create, read, update, delete
const CRUD = {
    addTodo: () => {
        let a = document.getElementById('addTodoTitle');
        let b = document.getElementById('addTodoDesc');
        let c = document.getElementById('addTodoRemindDate');
        let d = document.getElementById('addTodoDueDate');
        let e = document.getElementById('addTodoCategory');
        let f = new Date().getTime();
        todos.push(new Todo(a.value, b.value, c.value, d.value, e.value, f));
        TODO_ADD_FORM.hide();
        document.getElementById('todo-list').innerHTML += createTodoHTML(f);
        [a.value, b.value, c.value, d.value, e.value] = ['', '', '', '', ''];
        save();
    },
    editTodo: (idNum) => {
        let j = todos.findIndex(e => e.id == idNum);
        if (j < 0) return -1;
        let a = document.getElementById('editTodoTitle');
        let b = document.getElementById('editTodoDesc');
        let c = document.getElementById('editTodoRemindDate');
        let d = document.getElementById('editTodoDueDate');
        let e = document.getElementById('editTodoCategory');
        todos[j].name = a.value;
        todos[j].description = b.value;
        todos[j].remindDate = c.value;
        todos[j].dueDate = d.value;
        todos[j].category = e.value;
        TODO_EDIT_FORM.hide();
        save();
        render();
    },
    completeTodo: (idNum) => {
        let j = todos.findIndex(e => e.id == idNum);
        if (j < 0) return -1;
        todos[j].done = document.getElementById(idNum + '-check').checked;
        save();
    },
    deleteTodo: (idNum) => {
        let j = todos.findIndex(e => e.id == idNum);
        if (j < 0) return -1;
        todos.splice(j, 1);
        TODO_DELETE_FORM.hide();
        document.getElementById(idNum).remove();
        save();
    }
}

function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    let todoListHTML = document.getElementById('todo-list');
    todoListHTML.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        todoListHTML.innerHTML += createTodoHTML(todos[i].id);
    }
}

render();

function createTodoHTML(idNum) {
    let j = todos.findIndex(e => e.id == idNum);
    if (j < 0) return -1;
    return `<li class="todo-body" id="${idNum}">
                    <input type="checkbox" id="${idNum}-check" class="todo-checkbox" onclick="CRUD.completeTodo(${idNum})" ${(todos[j].done) ? 'checked' : ''}>
                    <div>
                        <h3 class="todo-title">
                            <span onclick="TODO_READ_FORM.show(${idNum})">${todos[j].name}</span>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                    width="24px" fill="#5f6368" onclick="TODO_EDIT_FORM.show(${idNum})">
                                    <path
                                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                    width="24px" fill="#5f6368" onclick="TODO_DELETE_FORM.show(${idNum})">
                                    <path
                                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                </svg>
                            </div>
                        </h3>
                        <p class="todo-desc">${(todos[j].description == '') ? '<i>Keine Beschreibung</i>' : todos[j].description}</p>
                        <span class="todo-category">#${(todos[j].category == '') ? 'main' : todos[j].category}</span>
                    </div>
                </li>`;
}