if (!sessionStorage.getItem("jwt")) {
    window.location.href = "/";
}
window.addEventListener("load", () => {
    let misTodos = [];
    let misTodosDone = [];

    const tareasPendientes = document.querySelector(".tareas-pendientes");
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    const descripcion = document.querySelector(".nueva-tarea input");
    const formulario = document.querySelector('.nueva-tarea');
    const boton = document.querySelector("#agregarTarea");

    document.querySelector(".user-info p").innerHTML = sessionStorage.getItem('email').split('@')[0];

    document.querySelector("#logout").onclick = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }

    Promise.resolve()
        .then(pedirTodos)
        .then(renderizarTodos)
        .then(updateEventos);

    boton.onclick = (e) => {
        e.preventDefault();
        Promise.resolve()
            .then(agregarTodo)
            .then(renderizarTodos)
            .then(updateEventos);

        setTimeout(() => {
            formulario.reset()
        }, 100);
    }

    function updateEventos() {
        const ndPendientes = document.querySelectorAll('.tareas-pendientes .not-done');
        ndPendientes.forEach(nd => {
            nd.addEventListener('click', () => {
                tareasTerminadas.appendChild(nd.parentElement);
                updateEventos();
            })
        });

        const ndTerminadas = document.querySelectorAll('.tareas-terminadas .not-done');
        ndTerminadas.forEach(nd => {
            nd.addEventListener('click', () => {
                tareasPendientes.appendChild(nd.parentElement);
                updateEventos();
            })
        });

    }

    function pedirTodos() {
        const urlPedirTareas = "https://ctd-todo-api.herokuapp.com/v1/tasks";

        fetch(urlPedirTareas, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                }
            })
            .then(res => res.json())
            .then(manejarRespuesta);
    }

    function manejarRespuesta(respuesta) {
        respuesta.forEach(tarea => {
            const date = new Date(tarea.createdAt)
            const todo = {
                description: tarea.description,
                createdAt: `${get(0, date)}/${get(1, date)}/${get(2, date)}`
            }
            tarea.completed ? misTodosDone.push(todo) : misTodos.push(todo);
        })

    }

    function agregarTodo() {
        if (descripcion.value.trim().length)
            misTodos.push(getTodo());
    }

    function getTodo() {
        const date = new Date();
        return {
            description: descripcion.value.trim(),
            createdAt: `${get(0, date)}/${get(1, date)}/${get(2, date)}`
        };
    }

    function get(part, date) {
        const formats = [
            { day: "2-digit" },
            { month: "2-digit" },
            { year: "2-digit" }
        ];
        return new Intl.DateTimeFormat("es", formats[part]).format(date);
    }

    function renderizarTodos() {
        renderizarPendientes()
        renderizarTerminadas()
    }

    function renderizarPendientes() {
        tareasPendientes.innerHTML = "";
        misTodos.forEach((todo) => {
            addPendiente(todo)
        });
    }

    function renderizarTerminadas() {
        tareasTerminadas.innerHTML = "";
        misTodosDone.forEach((todo) => {
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
});