server.post('/registrar', (req, res) => {   
    const nombre = req.body.fnombre;
    const correo = req.body.fcorreo;
    const edad   = req.body.fedad;

    try {
        if (!nombre || !correo || !edad) {
            throw new Error("Todos los campos son obligatorios.");
        }

        const sql = 'INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)'; 
        
        // CORRECCIÓN: Agregamos (err, resultado) para capturar fallos de MySQL
        pool.query(sql, [nombre, correo, edad], (err, resultado) => {  
            if (err) {
                return res.render('formulario', { error: "Error de Base de Datos al insertar: " + err.message });
            }

            // Si se guardó con éxito, creamos la sesión
            req.session.usuarioActivo = nombre;  
            res.redirect('/panel');
        });

    } catch (error) {
        res.render('formulario', { error: error.message });
    }
});

server.get('/panel', (req, res) => {
    
    // CONTROL DE ACCESO: El guardia revisa si el usuario está logueado
    if (req.session.usuarioActivo) {
        
        // LEER LA BASE DE DATOS REAL (Traemos todas las filas de la tabla)
        pool.query('SELECT * FROM usuarios', (err, filas) => {
            
            // Si hay un error al leer XAMPP, lo frenamos al tiro antes de ir al EJS
            if (err) {
                return res.send("Error al leer la base de datos: " + err.message);
            }

            // SALVADO CRÍTICO: Si por alguna razón 'filas' viene null, lo transformamos en una lista vacía []
            // para que el .forEach() de panel.ejs no se caiga
            const usuariosParaMostrar = filas || [];

            // Le mostramos la Página 2 (panel.ejs) pasando la variable segura
            res.render('panel', { 
                usuarioLogueado: req.session.usuarioActivo, 
                listaUsuarios: usuariosParaMostrar 
            });
        });

    } else {
        // Si no tiene sesión, lo rebota a la Página 1 con error
        res.render('formulario', { error: "Acceso denegado. Primero debes registrarte." });
    }
});