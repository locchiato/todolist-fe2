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
        document.querySelector(".user-info p").innerText = `${user.firstName} ${user.lastName}`;

    })

window.addEventListener("load", () => {

    const tareasPendientes = document.querySelector(".tareas-pendientes");
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    const nuevaTarea = document.querySelector(".nueva-tarea input");
    const formulario = document.querySelector('.nueva-tarea');
    const boton = document.querySelector("#agregarTarea");
    const borrar = document.querySelector(".borrarTareas");

    const urlTareas = "https://ctd-todo-api.herokuapp.com/v1/tasks/";

    pedirTodos();

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

    function updateEventos() {
        const botones = document.querySelectorAll('.not-done');
        botones.forEach(nd => {
            nd.addEventListener('click', () => {
                const id = nd.dataset.id;
                const completed = nd.parentElement.parentElement.classList.contains("tareas-pendientes");
                modificarTarea(id, completed);
            });
        });

    }

    function modificarTarea(id, completed) {
        fetch(urlTareas + id, {
                method: "PUT",
                body: JSON.stringify({
                    completed: completed
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                }
            })
            .then(res => res.json())
            .then(pedirTodos);
    }

    document.querySelector("#logout").onclick = () => {
        let confirmacion = confirm("¿Desea cerrar sesion?")
        if (confirmacion) {
            sessionStorage.clear();
            window.location.href = "login.html";
        }
    }

    boton.onclick = e => {
        e.preventDefault();
        agregarTodo();
    }

    function agregarTodo() {
        const description = nuevaTarea.value.trim();
        if (!description.length) return;

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                description: description
            })
        }

        fetch(urlTareas, settings)
            .then(res => res.json())
            .then(pedirTodos);
    }

    borrar.onclick = e => {
        e.preventDefault();
        borrarTodas();

    }

    function borrarTodas() {
        const botones = document.querySelectorAll('.not-done');
        for (const boton of botones) {
            borrarTarea(boton.dataset.id);

        }

        setTimeout(() => {
            pedirTodos();
        }, botones.length * 80);
    }

    function borrarTarea(id) {
        fetch(urlTareas + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem('jwt')
                }
            })
            .then(res => res.json());
    }

    function renderizarTodos(tareas) {
        formulario.reset();

        //falso esqueleto que simula lo que va a ocupar el contenido
        const skeleton = document.querySelector('#skeleton');
        //lo borramos antes de cargar el contenido
        if (skeleton) {
            skeleton.remove();
        }


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
        <div class="remove"></div>
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
        <div class="remove"></div>
        </li>
        `;
    }
});