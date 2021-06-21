let todos = [{
    description: "Mi hermosa tarea",
    createdAt: "19/04/20",
}, ];

const tareasPendientes = document.querySelector(".tareas-pendientes");

function renderizarTodos() {
    //  console.log("deberiamos renderizar todas las todos del array");
    //for (let i = 0; i < listadoTodos.length; i++) {
    todos.forEach((todo) => {
        tareasPendientes.innerHTML += `<li class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
            <p class="nombre">${todo.description}</p>
            <p class="timestamp">${todo.createdAt}</p>
            </div>
            </li>
            `;
    })

}


function agregarTodo() {
    const inputValue = document.querySelector('.nueva-tarea input').value.trim();
    if (inputValue.length) {
        console.log(...todos)
        let nuevaLista = []
        const todo = {
            description: inputValue,
            createdAt: (new Date(Date.now())).toLocaleDateString()
        }
        nuevaLista.push(todo);
        todos = todos.concat(nuevaLista);
        console.log(todos)

    }
}


const botonAgregar = document.querySelector('.nueva-tarea button');

botonAgregar.addEventListener('click', function() {

    agregarTodo();
    setTimeout(() => {
        renderizarTodos();
    }, 4000);
});


renderizarTodos();


/* 
function getPosts(success, error) {
var req = new XMLHttpRequest();
    req.open('GET', 'https://jsonplaceholder.typicode.com/posts');

    req.onload = function() {
      if (req.status == 200) {
        success(JSON.parse(req.response));
      }
      else {
        error();
      }
    };

    req.send();
}

getPosts(
    function(r) {
        console.log(r)
    },
    function(r) {
        console.log('Ocurrió un error')
    },
)
<li class="tarea">
        <div class="not-done"></div>
        <div class="descripcion">
          <p class="nombre">Mi hermosa tarea</p>
          <p class="timestamp">Creada: 19/04/20</p>
        </div>
      </li> */