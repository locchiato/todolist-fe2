let misTodos = [];
let misTodosDone = [];

const tareasPendientes = document.querySelector(".tareas-pendientes");
const tareasTerminadas = document.querySelector(".tareas-terminadas");


const botonAgregar = document.querySelector(".nueva-tarea button");

window.addEventListener("load", () => {

    botonAgregar.addEventListener("click", function(event) {
        event.preventDefault();

        Promise.resolve()
            .then(agregarTodo)
            .then(actualizarStorage)
            .then(renderizarTodos)

        const form = document.querySelector('form');
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

function actualizarStorage() {
    localStorage.setItem("todos", JSON.stringify(misTodos));
    localStorage.setItem("todosDone", JSON.stringify(misTodosDone));

}

function crearLista(index) {
    if (index === 1) {
        crearTodo("Terminar mi sitio de To Dos.")
        crearTodo("Estudiar.")
    } else {
        crearTodo("Aprobar Front End I.")
        crearTodo("Estudiar.")
        crearTodoDone("Alimentar a mis gatas.")
        crearTodoDone("Estudiar.")
        crearTodoDone("Estudiar.")
    }
}

function crearTodo(inputValue) {
    let todo = getTodo(inputValue);
    misTodos.push(todo);
}

function crearTodoDone(inputValue) {
    let todo = getTodo(inputValue);
    misTodosDone.push(todo);
}

function getTodo(inputValue) {
    const date = `${get(0)}/${get(1)}/${get(2)}`;
    return {
        description: inputValue,
        createdAt: date,
    };
}

function get(part) {
    const formats = [
        { day: "2-digit" },
        { month: "2-digit" },
        { year: "2-digit" }
    ];
    return new Intl.DateTimeFormat("es", formats[part]).format(new Date());
}

function renderizarTodos() {
    cargarPendientes()
    cargarTerminadas()
}

function cargarPendientes() {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos === null) {
        misTodos = [];
    } else {
        misTodos = todos;
        renderizarPendientes(todos)
    }
}

function cargarTerminadas() {
    const todos = JSON.parse(localStorage.getItem("todosDone"));

    if (todos === null) {
        misTodosDone = [];
    } else {
        misTodosDone = todos;
        renderizarTerminadas(todos);
    }
}

function renderizarPendientes(todos) {
    tareasPendientes.innerHTML = "";
    todos.forEach((todo) => {
        addPendiente(todo)
    });
}

function renderizarTerminadas(todos) {
    tareasTerminadas.innerHTML = "";
    todos.forEach((todo) => {
        addTerminada(todo)
    });
}

function addPendiente(todo) {
    tareasPendientes.innerHTML += `<li class="tarea">
    <div class="not-done"></div>
    <div class="descripcion">
    <p class="nombre">${todo.description}</p>
    <p class="timestamp">${todo.createdAt}</p>
    </div>
    </li>
    `;
}

function addTerminada(todo) {
    tareasTerminadas.innerHTML += `<li class="tarea">
    <div class="not-done"></div>
    <div class="descripcion">
    <p class="nombre">${todo.description}</p>
    <p class="timestamp">Creada: ${todo.createdAt}</p>
    </div>
    </li>
    `;
}