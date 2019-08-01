const deleteTodoById = (id) => {
    fetch(`http://localhost:5000/api/v1/todos/${id}`, {
            method: "DELETE"
        })

        .then(res => res.json())
        .then(response => response)
        .catch(e => e);
    location.reload(true);
}

async function getAllTodos() {
    // get the todo from the api
    const response = await fetch("http://localhost:5000/api/v1/todos", {
            method: "GET",

            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => response)
        .catch(e => e);

    let newTodo = document.querySelector('.new-todo');
    if (response == "No todos") {
        return (newTodo.innerHTML = `<p class="no-todo">${response}</p>`);
    } else {
        response.todos.forEach(todo => {
            newTodo.innerHTML += `<div  class="todo-card" id=${todo.id} >
         <span class='delete'onClick=deleteTodoById(${todo.id})>X</span>
         <p class="todo-date">${todo.created_at}</p>
         <br>
        <p  class="todo-description" > ${todo.name}</p>
        <button onClick=updateTodoById(${todo.id})>Edit todo</button>
        </div>`;
        });
    }



}

getAllTodos();



document.querySelector('#add-button').addEventListener('click', () => {
    const todoText = document.getElementById('text').value;
    const todoBody = {
        name: todoText
    };
    fetch(`http:localhost:5000/api/v1/todos`, {
            method: "POST",
            body: JSON.stringify(todoBody),
            headers: {
                "content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => response)
        .catch(e => e);
    window.location = './index.html'
})

async function updateTodoById(id) {
    const backToHomeButton = document.getElementById('new-todo');
    backToHomeButton.addEventListener('click' , (e)=>{
        window.location = './index.html'
    })
    document.getElementById('main-todo-input').style.display = 'none';
    document.getElementById('edit').style.display = 'block';
    const response = await fetch(`http://localhost:5000/api/v1/todos/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => response)
        .catch(e => e);

    let formerTodo = response.todo.name;
    let formerTodoTime = response.todo.created_at;
    let formerTodoDiv = document.getElementById('former-todo');
    formerTodoDiv.innerHTML = `EDIT TODO : <b>"${formerTodo}"</b> ? <br> TIME CREATED : <u> ${formerTodoTime}</u>` ;

    let editedTodoText = document.getElementById('edit-todo').value;
    document.getElementById('save-edit').addEventListener('click', () => {
        todoBody = {
            name: editedTodoText
        };
        fetch(`http:localhost:5000/api/v1/todos/${id}`, {
                method: "PUT",
                body: JSON.stringify(todoBody),
                headers: {
                    "content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(response => response)
            .catch(e => e);

        window.location = './index.html'
    })
}