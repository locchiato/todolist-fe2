let todos = [{
    description: "Comer",
    createdAt: "19/04/20",
}, {
    description: "Estudiar",
    createdAt: "19/05/20",
}, {
    description: "Dormir",
    createdAt: "19/06/20",
}, ];

let misTodos;

const tareasPendientes = document.querySelector(".tareas-pendientes");
const tareasTerminadas = document.querySelector(".tareas-terminadas");
const form = document.querySelector('form');

const d = new Date();
const today = `${get(0)}/${get(1)}/${get(2)}`;

function get(part) {
    const formats = [
        { day: "2-digit" },
        { month: "2-digit" },
        { year: "2-digit" }
    ];
    return new Intl.DateTimeFormat("es", formats[part]).format(d);
}

const botonAgregar = document.querySelector(".nueva-tarea button");

window.addEventListener("load", () => {

    botonAgregar.addEventListener("click", function(event) {
        event.preventDefault();

        Promise.resolve()
            .then(agregarTodo)
            .then(actualizarStorage)

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

    if (inputValue.length && inputValue != 'clear')
        crearTodo(inputValue);
}

function crearTodo(inputValue) {

    let todo = {
        description: inputValue,
        createdAt: today,
    };

    misTodos.push(todo);
}

function actualizarStorage() {
    localStorage.setItem("todos", JSON.stringify(misTodos));

    renderizarTodos();

}

function renderizarTodos() {

    tareasPendientes.innerHTML = "";

    misTodos = JSON.parse(localStorage.getItem("todos"));

    if (misTodos === null) {
        misTodos = [];
    } else {
        misTodos.forEach((todo) => {
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