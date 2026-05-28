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


server.use(session({ //session
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true, 
        secure: false, 
        maxAge: 300000 }
}));


server.use(express.urlencoded({ extended: true}))
server.set('view engine', 'ejs'); 


server.get('/formulario', (req, res) => {
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
        
        pool.query(sql, [nombre, correo, edad], (err, resultado) => {  
            if (err) {
                return res.render('formulario', { error: "Error al insertar en la base de datos." + err.message });
            }

            req.session.usuarioActivo = nombre;
            
            res.redirect('/panel');
        });


    } catch (error) {
        res.render('formulario', { error: error.message });
    }

});

server.get('/panel', (req, res) => {
    
    if (req.session.usuarioActivo) {
        
        pool.query('SELECT * FROM usuarios', (err, filas) => { // 
            if (err) {
                return res.send("Error al leer la tabla usuarios.");
            }

            res.render('panel', { 
                usuarioLogueado: req.session.usuarioActivo, 
                listaUsuarios: filas 
            });
        });

    } else {
        res.render('formulario', { error: "Acceso denegado primero debes introducir tus datos." });
    }
});


server.get('/logout', (req, res) => { //Cerrar la sesion
    req.session.destroy(() => {
        res.redirect('/formulario');
    });
});
        


server.listen(port, () =>{
    console.log("Escuchando al servidor en el puerto", port)
})
