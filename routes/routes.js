import { Router } from "express";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator"
import passport from "passport";
import PassportLocal from "passport-local" // te permite guardar la info hasta finalizada la sesion.
import session from "express-session"
import cookieParser from "cookie-parser";
// import { Usuario } from '../public/js/clases/usuarios.js';
// import { PuntoMapa } from "../public/js/clases/puntosmapa.js";
import pg from "pg";
const {Pool} = pg;
import dotenv from "dotenv"
import express from "express";
import MethodOverride from "method-override";
import cors from "cors"



//configurar dotenv
dotenv.config()

const pool =new Pool({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database: process.env.DB, //nombre de database
    password: process.env.DB_PASS,
    port:process.env.DB_PORT
})
    pool.connect(function(err){
        if(err) throw err;
        console.log("conectado a BD");


});
// // CLASE USUARIO Y SUS FUNCIONES
//  class Usuario {
//     constructor(nombre,apellido,edad,correo,contraseña) {
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.edad = edad;
//         this.correo = correo;
//         this.contraseña = contraseña;
//     }



//            //crear usuario
// async agregarUsuario() {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     await client.query('INSERT INTO usuarios (nombre, apellido, edad, correo, contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING *', [this.nombre, this.apellido, this.edad, this.correo, this.contraseña]);
//     await client.query('COMMIT');
//   } catch (e) {
//     await client.query('ROLLBACK');
//     throw e;

//   } finally {
//     client.release();
//   }
// }

//     //Este no esta siendo usado como "método" en el sentido que no esta usando la clase para autenticar sino que esta llamando a la base de datos.podria estar en otro
//     async autenticar(username, password, done) {
//         try {
//             const res = await pool.query(`SELECT correo, contraseña, id, nombre from usuarios where correo LIKE $1`, [username])
//             let usuario = res.rows[0]
//             if (username == usuario.correo && password == usuario.contraseña) {
//             return done(null, { id: usuario.id, name: usuario.nombre})
//             }
//             return done(null, false)
//         } catch (error) {
//             throw error
//         }}

 
// }


//CLASE PUNTO MAPA Y SUS FUNCIONES 

// export class EventoMapa {
//     constructor(nombre,direccion,coordenadas,fechainicio,fechatermino) {
//         this.nombre = nombre;
//         this.direccion = direccion
//         this.coordenadas = coordenadas
//         this.fechainicio = fechainicio
//         this.fechatermino = fechatermino
    
//     }


// async agregarPunto() {
//     const client = await pool.connect();
//     try {
//       await client.query('BEGIN');
//       await client.query('INSERT INTO evento (nombre, direccion, coordenadas, fechainicio, fechatermino) VALUES ($1, $2, ST_GeomFromText($3, 4326),$4 ,$5) RETURNING *', [this.nombre, this.direccion, `POINT(${this.coordenadas.lng} ${this.coordenadas.lat})`, this.fechainicio, this.fechatermino]);
//       await client.query('COMMIT');
//     } catch (e) {
//       await client.query('ROLLBACK');
//       throw e;
//     } finally {
//       client.release();
//     }
//   }}


//SIN clase
// async function agregarPunto(nombre, categoria, coordenadas) {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     await client.query('INSERT INTO coordenadas (nombre, categoria, coordenadas) VALUES ($1, $2, ST_GeomFromText($3, 4326)) RETURNING *', [nombre, categoria, `POINT(${coordenadas.lng} ${coordenadas.lat})`]);
//     await client.query('COMMIT');
//   } catch (e) {
//     await client.query('ROLLBACK');
//     throw e;
//   } finally {
//     client.release();
//   }
// }

//ESTE seria el router
// router.post("/mapa", (req, res) => {
//   const { nombre, categoria, lat, lng } = req.body;

//   const coordenadas = { lat, lng };

//   const puntoMapa = new PuntoMapa(nombre, categoria, coordenadas);
//   puntoMapa.agregarPunto()
  
//   res.redirect("/mapa")




// static async obtenerPuntos() {
//     try {
//       const { rows } = await pool.query(
//         "SELECT nombre, ST_X(coordenadas::geometry), ST_Y(coordenadas::geometry) FROM coordenadas"
//       );
//       return rows.map((row) => ({
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [row.st_x, row.st_y],
//         },
//         properties: {
//           nombre: row.nombre,
//         },
//       }));
//     } catch (e) {
//       console.error(e);
//       throw e;
//     }
//   }
// }



// router.get('/admin/control', (req, res) => {
//     const query = 'SELECT id, nombre, img, direccion, horario, ST_AsGeoJSON(geom) FROM museums';
  
//     pool.query(query)
//       .then((result) => {
//         const rows = result.rows.map((row) => {
//           const { coordinates } = JSON.parse(row.st_asgeojson);
//           return {
//             id: row.id,
//             nombre: row.nombre,
//             img: row.img,
//             direccion: row.direccion,
//             horario: row.horario,
//             coordinates,
//           };
//         });
//         res.render('admin', { rows });
//         console.log(rows.map((row) => row.coordinates));
//       })
//       .catch((err) => {
//         console.error('Error fetching data from PostgreSQL database', err);
//       });
//   });








const router = Router();
const PassPortLocal = PassportLocal.Strategy //

let nombre; // No entiendo esta variable
let autenticacion = false;
router.use(cors());

    
// PARA INICIAR SESION
router.use(bodyParser.json()); //para soportar JSON encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser('secreto'));
router.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

//Configuracion Passport //
router.use(passport.initialize());
router.use(passport.session());
//API 
router.use(express.json());
router.use(express.urlencoded({extended:false}));
router.use(MethodOverride("_method", {methods : ["GET","POST"] }));

router.use(cors());

//1 => serializacion pasarle todo el objeto a un dato, cuando necesito usar al usario tomo el id y retorno el objeto (deserializacion)
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    done(null, { id });
})

// RUTAS GENERALES

// acceder a home
router.get("/", (req, res) => {
    res.render("home")
})



// acceder a arquitectura
router.get("/mapa", (req, res) => {
  res.render("mapa")
 
})


// RUTAS CON API
router.get("/mantenedor",async(req,res)=>{
 
  const resultado = await fetch("http://localhost:4000/api/v1/usuarios");
  const data = await resultado.json();
  res.render("mantenedor", {"usuarios":data});
});


router.get("/eventos",async(req,res)=>{
  
  const resultado = await fetch("http://localhost:4000/api/v1/datosevento"); 
  const data = await resultado.json();
  res.render("eventos", {"evento":data});
});



/////POST COORDENADA

router.post("/evento", async (req, res) => {
  try {
    const { nombre, region, ciudad, direccion, lat, lng, fechainicio, fechatermino } = req.body;
    
    // Insertar los datos en la base de datos
    const resultado = await pool.query(
      "INSERT INTO evento (nombre, region, ciudad, direccion, coordenadas, fechainicio, fechatermino) VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326), $7, $8) RETURNING id",
      [nombre, region, ciudad, direccion, lat, lng, fechainicio, fechatermino]
    );
    
    
    const nuevoEventoId = resultado.rows[0].id;
    res.redirect("/eventos");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el evento" });
  }
});
//     // Consultar el evento recién guardado
//     const eventoGuardado = await pool.query(
//       "SELECT id, nombre, region, ciudad, direccion, ST_AsGeoJSON(coordenadas) as geometry, fechainicio, fechatermino FROM evento WHERE id = $1",
//       [nuevoEventoId]
//     );

//     const geojsonData = {
//       type: "FeatureCollection",
//       features: eventoGuardado.rows.map((feature) => ({
//         type: "Feature",
//         geometry: JSON.parse(feature.geometry),
//         properties: {
//           id: feature.id,
//           nombre: feature.nombre,
//           region: feature.region,
//           ciudad: feature.ciudad,
//           direccion: feature.direccion,
//           fechainicio: feature.fechainicio.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
//           fechatermino: feature.fechatermino.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
//         },
//       })),
//     };

//     console.log(geojsonData);
//     res.json(geojsonData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al guardar el evento" });
//   }
// });





// ACTIVAR CUANDO SE ESTE TRABAJANDO Y NO TENER QUE LOGEAR A CADA RATO
// app debe estar solo asi para que no se entre sin autentificar
// router.get("/mapa", (req, res) => {
    
//     res.render("mapa")
// })


// pool.query

// router.get("/login", (req,res,next) =>{                   
//     if(req.isAuthenticated()){ 
//         autenticacion = true
//         return next()
//     }else{
//         res.redirect("/login")
//     }rs
// },
// (req, res) =>{ 
//     res.render("administrador",{autenticacion})
// })

// acceder a bootcamp
router.get("/eventos", (req, res) => {
    res.render("eventos")
})

// // acceder a login
router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/registro", (req, res) => {
    res.render("registro")
})
//RUTAS ESPECIFICAS



//utiliza la clase usuario para hacer login
// router.post("/login", passport.authenticate("local", {
//     failureRedirect: "/login"
//   }), function(req, res) {
//     const autenticacion = true;
//     const nombre = req.user.name;
//     console.log(nombre) //nombre de quien está conectado
//     res.render("login", { autenticacion, nombre });
//   });
//   // configurar el passport usando la clase a través de usuario.autenticar
//   const usuario = new Usuario();
//   passport.use(new PassPortLocal(function(username, password, done) {
//     usuario.autenticar(username, password, done);
//   }));
 

//// AUTENTICAR USUARIO



// Configuración de conexión a la base de datos


// Configuración Passport
passport.use(new PassportLocal(function(username, password, done) {
  // Realizar la lógica de autenticación aquí utilizando la base de datos

  // Ejemplo de consulta a la base de datos
  const query = 'SELECT * FROM usuarios WHERE correo = $1';
  const values = [username];

  pool.query(query, values, function(err, result) {
    if (err) {
      return done(err);
    }

    const user = result.rows[3];
    if (!user) {
      // Usuario no encontrado
      return done(null, false);
    }

    if (user.password === password) {
      // Autenticación exitosa
      nombre = username;
      autenticacion = true;
      return done(null, { name: nombre });
    } else {
      // Contraseña incorrecta
      return done(null, false);
    }
  });
}));

router.use(passport.initialize());
router.use(passport.session());

///ruta login chatgpt
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login"
}), function(req, res) {
  const autenticacion = true;
  const correo = req.user.correo;
  console.log(correo); // Nombre de quien está conectado
  res.render("mantenedor", { autenticacion, correo });
});



// Ruta para iniciar sesión
// router.post("/login", passport.authenticate("local", {
//   failureRedirect: "/login"
// }), function(req, res) {
//   const autenticacion = true;
//   const nombre = req.user.name;
//   console.log(nombre); // Nombre de quien está conectado
//   res.render("login", { autenticacion, nombre });
// });

// ...





// // UTILIZA LA CLASE USUARIO PARA AGREGAR

router.post("/registro", (req, res) => {
    const { nombre, apellido, edad, correo,contraseña} = req.body;
  
    const user = new Usuario(nombre, apellido, edad, correo,contraseña);
    user.agregarUsuario()
  
    res.redirect("/login")
  });


  // Agregar usuario tercer intento -funcionó! <-------------------------------------------------------
  router.post("/eventos", (req, res) => {
    const { nombre, direccion, lat, lng , fechainicio,fechatermino } = req.body;
  
    const coordenadas = { lat, lng };
  
    const eventoMapa = new EventoMapa(nombre, direccion, coordenadas , fechainicio,fechatermino);
    eventoMapa.agregarPunto()
    
    res.redirect("/eventos")


  })

  // });
   // Agregar usuario tercer intento -funcionó! 
  //  router.get("/mostrarmapa", (req, res) => {
  //   const { nombre, direccion, lat, lng , fechainicio,fechatermino } = req.body;
  
  //   const coordenadas = { lat, lng };
  
  //   const eventoMapa = new EventoMapa(nombre, direccion, coordenadas , fechainicio,fechatermino );
  //   eventoMapa.agregarPunto()
    
  //   res.redirect("/mapa")
  // });
  

//   app.get("mapa", async (req, res) => {
//     const resultado = await pool.query(
//         "SELECT id, nombre, direccion, ST_AsGeoJSON(geom) AS geometry, fechainicio, fechatermino FROM evento order by id"
//     );
//     const geojsonData = {
//         type: "FeatureCollection",
//         features: resultado.rows.map((feature) => ({
//             type: "Feature",
//             geometry: JSON.parse(feature.geometry),
//             properties: {
//                 id: feature.id,
//                 nombre: feature.nombre,
//                 direccion: feature.direccion,
//                 Horario: feature.horario,
//             },
//         })),
//     };
//     res.json(geojsonData);
// });
  

//Crear usuario
//lo que se registra en el input debe pasarse a otro formato para poder subirlo a la BD

export default router //exportar todo lo que está en routes.jss
