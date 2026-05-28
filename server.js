const express = require('express');
const server = express();
const session = require('express-session')
const port = 9000;
const mysql = require('mysql2');


const pool = mysql.createPool({ //Conexion a la base de datos
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contactos'
})



server.use(express.urlencoded({ extended: true}))
server.set('view engine', 'ejs'); 


server.get('/formulario', (req, res) => {  //Renderiza mi formulario
    res.render('formulario');  
});



server.post('/registrar', (req, res) => {   //Post para obtener datos y introducirlos en al base de datos
    const nombre = req.body.fnombre;
    const correo = req.body.fcorreo;
    const edad   = req.body.fedad;

   try {
        if (!nombre || !correo || !edad) {
            throw new Error("Todos los campos son obligatorios.");
        }

        const sql = 'INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)'; //Consulta de insertar el usuario
        
        pool.query(sql, [nombre, correo, edad], () => {  //Realizo la consulta con los datos 


            res.redirect('/panel');
        });


    } catch (error) {
        res.render('formulario', { error: error.message });
    }

});


        



server.get('/panel', (req, res) => {
    res.render('panel'); 
});











server.listen(port, () =>{
    console.log("Escuchando al servidor en el puerto", port)
})
