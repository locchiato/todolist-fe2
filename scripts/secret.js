function getPosts(success, error) {
    var req = new XMLHttpRequest();
    req.open("GET", "https://jsonplaceholder.typicode.com/posts");

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        } else {
            error();
        }
    };

    req.send();
}

getPosts(
    function(r) {
        console.log(r);
    },
    function(r) {
        console.log("Ocurrió un error");
    }
);

/*
    <li class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
              <p class="nombre">Mi hermosa tarea</p>
              <p class="timestamp">Creada: 19/04/20</p>
            </div>
          </li> */


/*
    }

    if (inputValue == 'lista1') {
        crearLista(1);
    } else if (inputValue == 'lista2') {
        crearLista(2);
        
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
        */