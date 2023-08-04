// Este es el archivo principal de la api, aqui comenzamos asignando los metodos que nesecitaremos como express y cors. ademas de la "base de datos"(libreria) y el puerto.

const express = require('express');
const app = express();
const cors = require('cors');
const {libros}=require('./datos/libreria.js').libreria;

const PORT= 3000;

app.use( 
    express.urlencoded({
        extended:true
    })
)
app.use(express.json({
    type:"*/*"
}))

app.use(cors());

//Routing y Peticiones
app.get('/libros',(req,res)=>{
    // let decodificada = decodeURIComponent(req.url);
    let objLibro=JSON.parse(req.query.datos)
    const titulo= objLibro.titulo;
    const resultado= libros.filter(libros=>libros.titulo === titulo);
    if(resultado.length===0){
        return res.status(204).send(`No se encontraron libros con el titulo: ${titulo}`);
    }
    res.send(JSON.stringify(resultado));
});

app.post('/libros',(req,res)=>{
    let libroNuevo = req.body;
    libros.push(libroNuevo);
    res.send(JSON.stringify(libroNuevo));
    
});

app.delete('/libros',(req,res)=>{
    let objLibro=JSON.parse(req.query.datos)
    const titulo= objLibro.titulo;
    const indice= libros.findIndex(libros=>libros.titulo === titulo);
    if(indice>=0) {
        libros.splice(indice, 1);

    }
    res.send('JSON.stringify(libros)');
})

app.put('/libros',(req,res)=>{
    let objLibro=JSON.parse(req.query.datos)
    const libroActualizado=req.body;
    const titulo= objLibro.titulo;
    
    const indice= libros.findIndex(libros=>libros.titulo === titulo);
    if(indice>=0){
        libros[indice]=libroActualizado;
    }
    res.send(JSON.stringify(libroActualizado));
    console.log(libroActualizado);
})

// por ultimo el puerto de escucha.
app.listen(PORT, ()=>{
    console.log("el servidor esta escuchando....")
})