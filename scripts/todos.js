let listadoTodos = [{
    description: "Mi hermosa tarea",
    createdAt: "19/04/20",
}, ];

/* <li class="tarea">
        <div class="not-done"></div>
        <div class="descripcion">
          <p class="nombre">Mi hermosa tarea</p>
          <p class="timestamp">Creada: 19/04/20</p>
        </div>
      </li> */


const tareasPendientes = document.querySelector(".tareas-pendientes");

function renderizarTodos() {
    // tareasPendientes.innerHTML

    //for (let i = 0; i < listadoTodos.length; i++) {
    listadoTodos.forEach((todo) => {
        tareasPendientes.innerHTML += `<li class="tarea">
        <div class="not-done"></div>
        <div class="descripcion">
        <p class="nombre">${todo.description}</p>
        <p class="timestamp">${todo.createdAt}</p>
        </div>
        </li>
        `;
    })

    //  console.log("deberiamos renderizar todas las todos del array");
}

renderizarTodos();