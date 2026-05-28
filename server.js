const express = require('express');
const server = express();
const port = 9000;
const sql = require('mysql2');


server.use(express.urlencoded({ extended: true}))
server.set('view engine', 'ejs');


server.get('/formulario', (req, res) => { 
    res.render('formulario'); 
});














server.listen(port, () =>{
    console.log("Escuchando al servidor en el puerto", port)
})
