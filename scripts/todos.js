if (!sessionStorage.getItem("jwt")) {
    window.location.href = "login.html";
}
const urlUsuario = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

fetch(urlUsuario, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem('jwt')
        }
    })
    .then(res => res.json())
    .then(user => {
        document.querySelector(".user-info p").innerHTML = `${user.firstName} ${user.lastName}`;

    })

window.addEventListener("load", () => {

    const tareasPendientes = document.querySelector(".tareas-pendientes");
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    const descripcion = document.querySelector(".nueva-tarea input");
    const formulario = document.querySelector('.nueva-tarea');
    const boton = document.querySelector("#agregarTarea");
    const borrar = document.querySelector(".borrar-todas");

    const urlTareas = "https://ctd-todo-api.herokuapp.com/v1/tasks/";


    document.querySelector("#logout").onclick = () => {
        sessionStorage.clear();
        window.location.href = "login.html";
    }

    boton.onclick = e => {
        e.preventDefault();
        agregarTodo();
        actualizar();
    }

    borrar.onclick = e => {
        e.preventDefault();
        borrarTodas();
    }

    actualizar();


    function actualizar() {
        setTimeout(() => {
            formulario.reset();
            pedirTodos();
            updateEventos();
        }, 100);
    }

    function updateEventos() {
        const botones = document.querySelectorAll('.not-done');
        botones.forEach(nd => {
            nd.addEventListener('click', () => {
                const completed = nd.parentElement.parentElement.classList.contains("tareas-pendientes");
                modificarTarea(nd.dataset.id, completed);
            })
        });

    }

    function borrarTodas() {
        const botones = document.querySelectorAll('.not-done');
        for (const boton of botones) {
            borrarTarea(boton.dataset.id);
        }
        setTimeout(() => {
            actualizar();
        }, botones.length * 25);


    }

    function borrarTarea(id) {
        fetch(urlTareas + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                }
            })
            .then(res => res.json())

    }

    function modificarTarea(id, completed) {
        const data =
            JSON.stringify({
                completed: completed
            })

        fetch(urlTareas + id, {
                method: "PUT",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                }
            })
            .then(res => res.json())
            .then(pedirTodos);
    }

    function pedirTodos() {
        fetch(urlTareas, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                }
            })
            .then(res => res.json())
            .then(renderizarTodos)
            .then(updateEventos);
    }


    function agregarTodo() {
        const desc = descripcion.value.trim();
        if (!desc.length) return;

        const data = {
            description: desc
        }

        fetch(urlTareas, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json());
    }

    async function renderizarTodos(tareas) {
        tareasPendientes.innerHTML = "";
        tareasTerminadas.innerHTML = "";

        tareas.forEach(tarea => {
            tarea.completed ? addTerminada(tarea) : addPendiente(tarea);
        })
    }

    function normFecha(fecha) {
        return (new Date(fecha)).toLocaleDateString();
    }

    function addPendiente(todo) {
        tareasPendientes.innerHTML += `<li class="tarea">
        <div class="not-done" data-id="${todo.id}"></div>
        <div class="descripcion">
        <p class="nombre">${todo.description}</p>
        <p class="timestamp">${normFecha(todo.createdAt)}</p>
        </div>
        </li>
        `;
    }

    function addTerminada(todo) {
        tareasTerminadas.innerHTML += `<li class="tarea">
        <div class="not-done" data-id="${todo.id}"></div>
        <div class="descripcion">
        <p class="nombre">${todo.description}</p>
        <p class="timestamp">${normFecha(todo.createdAt)}</p>
        </div>
        </li>
        `;
    }
});