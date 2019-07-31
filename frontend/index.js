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
            newTodo.innerHTML += `<div class="todo-card" id=${todo.id} onClick=deleteTodoById(${todo.id})>
         <span class='delete'>X</span>
         <p class="todo-date">${todo.created_at}</p>
         <br>
        <p  class="todo-description" > ${todo.name}</p>
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
        location.reload(true);
})