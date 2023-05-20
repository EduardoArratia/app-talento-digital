
"use strict";

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZWR1YXJkb2FycmF0aWEiLCJhIjoiY2xnZjZ2NnI0MDZ0NTN0bHF6aXUwazZ2MiJ9.SqjfShc-Io_qwFTj3wImZw';
// Mapbox Docs example - https://docs.mapbox.com/mapbox-gl-js/example/simple-map/

// This function is run on window 'load' event, once all scripts in the html file are loaded
const main = () => {
    // Set the Mapbox API access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
   
    const inicioBtn = document.getElementById('inicio-btn');
inicioBtn.addEventListener('click', () => {
  window.location.href = '/';
});


    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-71.551776,-33.024310 ], // starting position [lng, lat] // ESTAN AL REVES LA LATITUD Y LONGITUD
        zoom: 17 // starting zoom
    });
    // Obtiene las coordenadas de geolocalización actual
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]); // Establece las coordenadas como el centro del mapa
    });
    let markersVisible = true;

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    
     

    axios.get("http://localhost:4000/api/v1/evento")
  .then((result) => {
    const geojsonData = result.data;

    map.on("load", () => {
        map.addSource("places", {
            type: "geojson",
            data: geojsonData,
        });
    
        map.addLayer({
            id: "places",
            type: "circle",
            source: "places",
            paint: {
                "circle-color": "#E0C640",
                "circle-radius": 6,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#5E5E5E",
            },
            
            interactive: true,
            
        });
       


        // Evento "mouseenter" para mostrar la información adicional
        map.on("mouseenter", "places", (e) => {
            map.getCanvas().style.cursor = 'pointer';

            const coordinates = e.features[0].geometry.coordinates.slice();
        
            const description = ` ${e.features[0].properties.nombre}
             Dirección: ${e.features[0].properties.direccion}
             Inicio: ${e.features[0].properties.fechainicio}
             Término: ${e.features[0].properties.fechatermino}    `;
            

           

            const correctedCoordinates = [coordinates[0], coordinates[1]];
            popup
                .setLngLat(correctedCoordinates)
                .setHTML(description)
               
                .addTo(map)
                
                
           
            console.log(coordinates,e.features[0].properties.nombre);
        });
    
        // Evento "mouseleave" para ocultar la información adicional
        map.on("mouseleave", "places", () => {
            map.getCanvas().style.cursor = "";
            popup.remove()
        });
    });
    

  })
}
window.addEventListener("load", main);
  
  // SIN POPUP          
// "use strict";

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZWR1YXJkb2FycmF0aWEiLCJhIjoiY2xnZjZ2NnI0MDZ0NTN0bHF6aXUwazZ2MiJ9.SqjfShc-Io_qwFTj3wImZw';

// const main = () => {
//     mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [-71.55, -33.02],
//         zoom: 17
//     });

//     axios.get("http://localhost:4000/api/v1/evento")
//         .then((result) => {
//             const geojsonData = result.data;

//             map.on("load", () => {
//                 map.addSource("places", {
//                     type: "geojson",
//                     data: geojsonData,            
//                 });
//                 console.log(geojsonData)
//                 map.addLayer({
//                     id: "places",
//                     type: "circle",
//                     source: "places",
//                     paint: {
//                         "circle-color": "#4264fb",
//                         "circle-radius": 10,
//                         "circle-stroke-width": 2,
//                         "circle-stroke-color": "#ffffff",
//                     },
//                     interactive: false,
//                 });

//                 map.on("click", "places", (e) => {
//                     const coordinates = e.features[0].geometry.coordinates;
//                     console.log("Coordenadas:", coordinates);
//                   });
//                 // Evento "mouseenter" para mostrar la información adicional
//                 map.on("mouseenter", "places", (e) => {
//                     map.getCanvas().style.cursor = 'pointer';
                    
//                     console.log("Mouse enter:", e.features[0].properties.nombre,e.features[0].geometry.coordinates);
//                 });

//                 // Evento "mouseleave" para ocultar la información adicional
//                 map.on("mouseleave", "places", () => {
//                     map.getCanvas().style.cursor = "";
//                     console.log("Mouse leave");
//                 });
//             });
//         });
// }

// window.addEventListener("load", main);