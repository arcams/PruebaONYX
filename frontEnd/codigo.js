// Leemos los botones y listas con las que trabajaremos a lo largo del codigo

const botonInfo= document.getElementById('mostrarInfo');
const botonEliminar= document.getElementById('eliminar');
const botonAgregar=document.getElementById('btnAgregar');

const contenedorTabla= document.getElementById('contenedorTabla');
var UlLista= document.querySelector(".libros-ul");


// Primero comenzamos con los listeners de los botones asociado a las peticiones que se haran mediante funciones que estaran mas abajo en el codigo.

botonAgregar.addEventListener('click',()=>{
    let opciones= {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(agregarDatos())
    }

    enviarDatos("http://localhost:3000/libros",opciones);

    let nuevoLibro= agregarDatos();

    let html=`<input type="radio" name="opcLibro" id="opcion8" value="${nuevoLibro.titulo}"><label for="opcion8">${nuevoLibro.titulo}</label> <br>`
    ;
    UlLista.innerHTML += html;

})



botonEliminar.addEventListener('click',(event)=>{
    event.preventDefault();
    let opciones= {method: "DELETE"}
    enviarDatos(leerDatos(),opciones);

    let input= document.querySelector("input[name='opcLibro']:checked");
    let label = input.nextElementSibling;
    let lista = label.parentNode;
    lista.removeChild(input);
    lista.removeChild(label);


})

botonInfo.addEventListener('click', (event)=>{
    event.preventDefault();
    enviarDatos(leerDatos());
});

// Desde aqui comienzan las funciones que haran las peticiones, GET, POST, PUT Y DELETE. Ademas de las funciones de edicion de tabla y guardar que estaran bajo del todo.

function agregarDatos(){
    let autor=document.getElementById('autor').value;
    let titulo=document.getElementById('titulo').value;
    let año=document.getElementById('año').value;
    let idioma=document.getElementById('idioma').value;
    let categoria=document.getElementById('categoria').value;
    let datos = {
        
        autor: autor,
        titulo: titulo,
        año : año,
        idioma: idioma,
        categoria: categoria
      };   
      return datos
}
function leerDatos(){
    let libroTitulo= document.querySelector("input[name='opcLibro']:checked").value;
    let libro={titulo:libroTitulo};
    let libroJson= JSON.stringify(libro);
    let codificada = encodeURIComponent(libroJson);
    let completa = "http://localhost:3000/libros" + "?datos=" + codificada;
    return completa;
}

function enviarDatos(url,opciones){
    fetch(url,opciones)
    .then((res)=> res.json())
    .then(data => {
        console.log(data)
        mostrarDatos(data)
    })
    .catch((err)=>{
        console.log(err)
    })

}

function mostrarDatos(datos){
    var tablaLibros= document.getElementById('tablaLibros');
    var cuerpoTabla=document.createElement('tbody');
  datos.forEach(element => {
    let fila = document.createElement("tr");
    let td= document.createElement('td');
    td.innerText=element.autor;
    fila.appendChild(td);

    td= document.createElement('td');
    td.innerText=element.titulo;
    fila.appendChild(td);
 
    td= document.createElement('td');
    td.innerText=element.año;
    fila.appendChild(td);

    td= document.createElement('td');
    td.innerText=element.idioma;
    fila.appendChild(td);

    td= document.createElement('td');
    td.innerText=element.categoria;
    fila.appendChild(td);

    cuerpoTabla.appendChild(fila);

  }); {
  }
  tablaLibros.appendChild(cuerpoTabla);
}

function editarTabla() {    
    let celdas = document.querySelectorAll("#tablaLibros td");
    for (let i = 0; i < celdas.length; i++) {
      celdas[i].contentEditable = true;
    }
}
function guardarTabla(){
    let tabla = document.getElementById("tablaLibros");
    let celdas = document.querySelectorAll("#tablaLibros td");

    // Crear el arreglo vacío
    let libros = [];

    // Recorrer las filas de la tabla
    tabla.querySelectorAll("tbody tr").forEach(function(fila) {
        var libro = {};
        libro.Autor = fila.cells[0].textContent;
        libro.Título = fila.cells[1].textContent;
        libro.Año = fila.cells[2].textContent;
        libro.Idioma = fila.cells[3].textContent;
        libro.Categoria = fila.cells[4].textContent;
        libros.push(libro);
    });

    var json = JSON.stringify(libros);
    let opciones= {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    }

    enviarDatos("http://localhost:3000/libros",opciones)
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].contentEditable = false;
      }
}