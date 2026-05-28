1.- Como prrimer paso para comenzar este proyecto y ya ubicados dentro de nuesta carpeta, se procede a hacer iniciacion y 
     la instalacion de librerias que se usaran en el proyecto eso. Usamos "npm init -y" que creara la estructura en donde se 
     guardaran nuestar librerias, luego procedemos a usar "npm install express express-session mysql2 ejs" todas estas son las 
     librerias que usaremos para nuestro proyecto y levantar la pagina web.

2.- Se crea nuestro archivo de servidor en este caso server.js que donde importaremos nuestras liberias para su uso comenzaremos
    a asignar un puerto, y haremos toda nuestra logica para la conexion a la base de datos, obtener datos y procesarlos o validarlos
    ademas de obtener una respuesta de nuestro servidor al iniciarlo.

3.- Se crea la carpeta views que contendra nuestras vistas de usuario o archivos ejs que contendran el formulario y el panel
    que mostrara la lista de contactos ingresados.

5.- Se crea mediante Xampp la base datos utilzando el sigueinte script:
    CREATE DATABASE IF NOT EXISTS contactos;
    USE contactos;

    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(100) NOT NULL,
        edad INT NOT NULL
    );

4.- Se crea la pool de mysql, esto nos permite que nuestro servidor se pueda conectar a la base de datosm utilizando en este caso
    localhost, y los datos de validacion predefinidos como usuario 'root' y sin contraseña, ademas de especificar la base de datos 
    que se usara, en este caso "contactos"


5.- Dentro de server.js, configuramos las herramientas esenciales para que el servidor entienda los datos. 
    usamos server.set('view engine', 'ejs') para decirle a express que renderice las vistas usando EJS. 
    Además, activamos express.urlencoded({ extended: true }) que actúa como un traductor que captura y
     leer la información que el usuario escribe en los inputs que hicimos en nuestro formulario.

6.- Se implementaron cookies en el sistema esto crea un casillero seguro en la memoria del servidor para cada usuario,
    permitiendo que la aplicación recuerde si el usuario ya se registró y dándole el acceso a nuestra vista panel sin perder su estado.

7.- Creamos la primera ruta que responde al navegador mediante res.render('formulario'). 
    La funcion de esta buscar el archivo formulario.ejs dentro de la carpeta views y mostrárselo 
    al usuario para que pueda ingresar sus datos.

8.- Se crea la ruta POST /registrar, la funcion de esta es capturar las variables que ingresa el usuario
    utilizamos un try-catch para prevenir el erro de que los campos vengan vacios, envia un error, si todo esta correcto se realiza
    una consulta de insertar dentro de la base de datos utilizando los datos capturados en el formulario, al mismo tiempo se crea y guarda
    la variable de session del usuario y lo redirige a la vista panel.


9.- Se crea la ruta GET /panel, la funcion de esta es realizar una querry que contiene la consulta de SELECT para extraer todas 
    las filas desde la base de datos y mostrarla en la vista panel, pero antes de realizar todo lo anterior, primero verifica 
    que la sesion del usuario este activa mediante un if, que si cumple la condicion procede a hacer la querry.


10.- Se crea la ruta GET logout/, esta cumple la funcion de que el usuario pueda cerrar su sesion, utiliza un req.session.destroy(), 
    que borra por completo lo explicado anteriormente, borra el casillero en memoria del servidor y elimina la cookie del navegador
    para redirigir al usuario al formulario nuevament.


11.- Si el usuario intenta abrir http://localhost:9000/panel sera enviado automaticamente al formulario al no tener su 
    sesion activa o mejor dicho registrada al introducir los datos en el formulario
