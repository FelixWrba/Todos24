let todos = [];

class Todo {
    name;
    description;
    remindDate;
    dueDate;
    category;

    done = false;
    id = new Date().getTime();

    constructor(name, description = '', remindDate = '', dueDate, catgory = 'main') {
        this.name = name;
        this.description = description;
        this.remindDate = remindDate;
        this.dueDate = dueDate;
        this.category = catgory;
    }
}

// create, read, update, delete
const CRUD = {
    addTodo: () => { console.log('Todo added'); },
    editTodo: () => { console.log('Todo edited'); },
    completeTodo: () => { console.log('Todo completed'); }
}