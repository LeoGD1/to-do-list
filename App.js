const $fecha = document.getElementById('fecha');
const $input = document.getElementById('input');
const $agregar = document.getElementById('agregar');
const $lista = document.getElementById('lista');
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const through = 'line-through';
const opacidad = 'opacity';
let id;
let lista;

let date = new Date();

//agrega la fecha en el encabezado
$fecha.innerText = date.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day:'numeric' });


//function para agregar la tarea
function agregarTarea(tarea, id, completada, eliminada) {
    if(eliminada) {return}

    let LINE = completada ? through : '';
    let REALIZADO = completada ? check : uncheck;

    let li = `
        <li>
            <i class="fa-regular ${REALIZADO} icon" data="realizada" id=${id}></i>
            <p class="${LINE}" id="texto">${tarea}</p>
            <i class="fa-solid fa-trash icon" data="eliminada" id=${id}></i>
        </li>`;
    $lista.insertAdjacentHTML('beforeend', li);
};

//funcion para la tarea realizada
function tareaRealizada(elemento) {
    elemento.classList.toggle(uncheck);
    elemento.classList.toggle(check);
    elemento.parentNode.querySelector('#texto').classList.toggle(through);
    lista[elemento.id].realizado = lista[elemento.id].realizado ? false : true;
}

//funcion para eliminar tarea
function tareaEliminada (elemento) {
    elemento.parentNode.remove();
    lista[elemento.id].eliminado = true;
}

//funcion para cargar la lista del local storage
function crearLista(data) {
    data.forEach(li => {
        agregarTarea(li.nombre, li.id, li.realizado, li.eliminado);
    });
}


//Evento boton agregar
$agregar.addEventListener('click', () => {
    valorActual = $input.value;
    if(valorActual) { 
        agregarTarea(valorActual, id, false, false);
        
        lista.push({
            nombre: valorActual,
            id: id,
            realizado: false,
            eliminado: false
        });

        localStorage.setItem('toDoList', JSON.stringify(lista));
        $input.value = '';
        id++;
    }
});

//Evento con keyuo ENTER
document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        valorActual = $input.value;
        if(valorActual) { 
            agregarTarea(valorActual, id, false, false);
            
            lista.push({
                nombre: valorActual,
                id: id,
                realizado: false,
                eliminado: false
            }); 
        }
        localStorage.setItem('toDoList', JSON.stringify(lista));
        $input.value = '';
        id++;
    }
});


$lista.addEventListener('click', (e) => {
    elemento = e.target;
    elementoData = elemento.attributes.data.value;

    if (elementoData === 'eliminada') {
        tareaEliminada(elemento);
    } else if (elementoData === 'realizada') {
        tareaRealizada(elemento);
    }

    localStorage.setItem('toDoList', JSON.stringify(lista));
});


//cargar lo que hay en el local storage
let DATA = localStorage.getItem('toDoList');

if (DATA) {
    lista = JSON.parse(DATA);
    id = lista.length;
    crearLista(lista);
} else {
    lista = [];
    id = 0;
}