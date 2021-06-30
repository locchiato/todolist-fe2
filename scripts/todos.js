let misTodos = [];

let listadoTodosTerminadas = [];

const tareasPendientes = document.querySelector(".tareas-pendientes");
const tareasTerminadas = document.querySelector(".tareas-terminadas");
const form = document.querySelector('form');


const botonAgregar = document.querySelector(".nueva-tarea button");

window.addEventListener("load", () => {

    botonAgregar.addEventListener("click", function(event) {
        event.preventDefault();

        Promise.resolve()
            .then(agregarTodo)
            .then(actualizarStorage)
            .then(renderizarTodos)

        setTimeout(() => {
            form.reset()
        }, 100);

    })

    renderizarTodos();

});

function agregarTodo() {
    const inputValue = document.querySelector(".nueva-tarea input").value.trim();
    if (inputValue == 'clear') {
        misTodos = [];
    }

    if (inputValue == 'lista1') {
        crearLista(1);
    } else if (inputValue == 'lista2') {
        crearLista(2);
    } else if (inputValue.length && inputValue != 'clear')
        crearTodo(inputValue);
}

function crearLista(index) {
    if (index === 1) {
        crearTodo("Terminar mi sitio de To Dos.")
        crearTodo("Estudiar.")
    } else {
        crearTodo("Aprobar Front End I.")
        crearTodo("Estudiar.")
    }
}


function get(part) {
    const formats = [
        { day: "2-digit" },
        { month: "2-digit" },
        { year: "2-digit" }
    ];
    return new Intl.DateTimeFormat("es", formats[part]).format(new Date());
}

function crearTodo(inputValue) {


    const date = `${get(0)}/${get(1)}/${get(2)}`;
    let todo = {
        description: inputValue,
        createdAt: date,
    };

    misTodos.push(todo);
}

function actualizarStorage() {
    localStorage.setItem("todos", JSON.stringify(misTodos));

}

function renderizarTodos() {

    tareasPendientes.innerHTML = "";

    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos === null) {
        misTodos = [];
    } else {
        misTodos = todos;
        todos.forEach((todo) => {
            tareasPendientes.innerHTML += `<li class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
            <p class="nombre">${todo.description}</p>
            <p class="timestamp">${todo.createdAt}</p>
            </div>
            </li>
            `;
        });
    }

}

function addTerminada() {


    tareasTerminadas.innerHTML += `<li class="tarea">
    <div class="not-done"></div>
    <div class="descripcion">
    <p class="nombre">${todo.description}</p>
    <p class="timestamp">Creada: ${todo.createdAt}</p>
    </div>
    </li>
    `;
}
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