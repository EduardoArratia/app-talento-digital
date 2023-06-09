# app-talento-digital
TALENTO DIGITAL. Aplicación Web

1.- DESCRIPCIÓN DEL PROYECTO.
MAPOUT.
Eduardo Arratia.

La aplicación MAPOUT, esta pensada para registrar distintos eventos itinerantes en la ciudad, como Ferias Libres, Feria de las pulgas, Ferias gastronómicas, eventos musicales o todo evento que tenga lugar en el espacio público o con fecha acotada.
Actualmete en conjunto con la API se puede agregar puntos al mapa y mostrarlos en él.
Existe la opcion de ver los eventos sin el mapa, en la pestaña de "HOY" donde se encuentran filtrardos por eventos que esten ocurriendo en este momento y hasta 2 semanas despues de la fecha actual, estos esstán ordenados por región.
A modo de ejercicio se encuentran algunos puntos de ejemplo creados en distintos lugares.


2.- API
Se debe utilizar la API para podes desplegar los puntos que se vayan ingresando a ella.
Se dejan en el archivo "estructura_base_datos.txt algunos valores para las tablas
Además se debe considerar que la información de la BD debe ser ingresada a través del archivo .env

DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=


3.- REPOSITORIO
Para el desarrollo del proyecto se necesitó la instalación de node.js y la
SPara que el proyecto funcione correctamente es necesario la instalación node.js, y mediante terminal con el comando "npm i" se deben instalar las siguientes dependencias:
-body-parser
-cookie-parser
-cors
-dotenv
-ejs,
-express
-express-session
-express-validator
-hbs
-method-override
-nodemon,
-passport
-passport-local
-pg

Esta Aplicación está funcionando en el puerto 3000

SE adjuntan capturas de la aplicación:

1.- Pagina de inicio:
![pagina de inicio](https://github.com/EduardoArratia/app-talento-digital/blob/main/CapturasPantalla/MAPOUT%20READ%20ME.jpg)

2.- Mantenedor:
![pagina de inicio](https://github.com/EduardoArratia/app-talento-digital/blob/main/CapturasPantalla/usuarios%20registrados.jpg)

3.-MAPA:
![pagina de inicio](https://github.com/EduardoArratia/app-talento-digital/blob/main/CapturasPantalla/MAPA.jpg)

4.- Proximos eventos y agregar evento.
![pagina de inicio](https://github.com/EduardoArratia/app-talento-digital/blob/main/CapturasPantalla/PROXIMOS%20EVENTOS.jpg)
![pagina de inicio](https://github.com/EduardoArratia/app-talento-digital/blob/main/CapturasPantalla/agregarEvento.jpg)



RUBRICA DESPLEGADA:


1.-Consultas base de datos
-Selección de columnas requeridas para presentar la información solicitada:
En API: index.js lineas 40,47,55,81,108.
-Uso de JOIN para relacionar la información de distintas tablas:
En API: index.js lineas 86
-Uso de WHERE para filtrar la información requerida:
En API: index.js lineas 87
-Uso de cláusulas de ordenamiento para presentar la información:
En API: index.js lineas 40,47,55,81,108.
-Uso de cláusulas de agrupación de información para obtener datos agregados:
En API: index.js lineas 40.


2.-Algoritmo de cálculo y manipulación de archivos de texto
-Utilización general del lenguaje, sintaxis, selección de tipos de datos, sentencias lógicas, expresiones, operaciones, comparaciones
Se utiliza de manera recurrente en la aplicacion
-Utilización de sentencias repetitivas
Se utiliza de manera recurrente en la aplicacion, en especial con los templantes de hbs por ejemplo
-Convenciones y estilos de programación
Se utiliza de manera recurrente en la aplicacion
-Utilización correcta de estructuras de datos
Se utiliza de manera recurrente en la aplicacion
-Manipulación de archivos
-No posee.

3.-Página web y html
-Utilización de tags html, estilos y responsividad
Se utiliza de manera recurrente en la aplicación, en menor medida en algunas zonas.
-Utilización de Bootstrap
En APP eventos.hbs lineas 18 a 22.

4.-Lenguaje Node
-Inclusión de paquetes y librerías de usuario
En API: al inicio del index.js  
Se utiliza para el funcionamiento de la aplicación
-Agrupación del código y separación por funcionalidad
En API: En el index.js (su totalidad)  
Se utiliza de manera recurrente en la aplicación
-Utilización de funciones asíncronas
En API: En el index.js en 40, 47,55,81,108. 
-Lectura de parámetros de entrada
Se utiliza de manera recurrente en la aplicación
-Funcionamiento general del aplicativo
Se utiliza de manera recurrente en la aplicación: mapa.hbs, mantendor.hbs, evento.hbs

5.-Conexión a base de datos
Manejo de conexión a base de datos desde Node
En API: En el index.js entre las líneas 14 y 19
Manejo y ejecución de consultas desde Node
En API: En el index.js en general

6.-Uso de Express
-Creación servicio Rest con Express
En API: En el index.js en general
Se utiliza de manera recurrente en la aplicación.
