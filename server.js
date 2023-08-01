// Cargar las variables de entorno del archivo .env
require("dotenv").config();

// Importar el módulo Express
const express = require("express");
const app = express();

// Importar las funciones del gestor de frutas
const { leerFrutas, guardarFrutas } = require("./src/frutasManager");

// Configurar el número de puerto para el servidor
const PORT = process.env.PORT || 3000;

// Crear un arreglo vacío para almacenar los datos de las frutas
let BD = [];


// Configurar el middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware para leer los datos de las frutas antes de cada solicitud
app.use((req, res, next) => {
  BD = leerFrutas(); // Leer los datos de las frutas desde el archivo
  next(); // Pasar al siguiente middleware o ruta
});

// Ruta principal que devuelve los datos de las frutas
app.get("/", (req, res) => {
   res.send(BD);
});

// Ruta busqueda por id
app.get('/id/:id', (req, res) =>{  
  let idem = parseInt(req.params.id);
  const result = BD.find(i=>i.id===idem);
  result ? res.json(result):res.json([
    { id: "Error",descripcion : "No hay coincidencias!"}
  ]);
});

// Ruta para actualizar propiedades por id y guarda nuevos cambios.
app.put('/id/:id', (req, res) =>{   
  let iden = parseInt(req.params.id);
  const result = BD.find(i=>i.id===idem);
  console.log(result);
  if(result){
    const find=elment=>elment===result;
    
    const otraFruta=req.body;
    
    BD[BD.findIndex(find)] = otraFruta
    guardarFrutas(200).send("Valores editados con éxito!")
  } else {
    const nuevaFruta=req.body;
    BD.push(nuevaFruta);
    guardarFrutas(BD);
    res.status(201).send("Fruta editada con éxito!")
  }
});

// Ruta para eliminar frutas por id
app.delete('/id/:id', (req,res) =>{
  let iden = parseInt(req,params,id);
  const result = BD.find(i=>i.id===iden);
  if (result){
    BD = BD.filter(element=>element.id !==idem);
    guardarFrutas(BD);
    res.status(200).send("archivo eliminado con éxito!")
  } else {
    res.send("No existe fruta")
  }
  });


// Ruta para agregar una nueva fruta al arreglo y guardar los cambios
app.post("/", (req, res) => { 
    const nuevaFruta = req.body;
    BD.push(nuevaFruta); // Agregar la nueva fruta al arreglo
    guardarFrutas(BD); // Guardar los cambios en el archivo
    res.status(201).send("Fruta agregada con éxito!"); // Enviar una respuesta exitosa
  
});

// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe!");
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
