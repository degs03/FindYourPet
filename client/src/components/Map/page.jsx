"use client"
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef } from "react";

const Map = () => {
    //Almacena valores mutables que no provocan una nueva renderizacion
    const mapRef = useRef(null);

    useEffect(() => {
        //Funcion para iniciar el mapa
        const initMap = async () => {
            const loader = new Loader({//Carga la API de Maps utilizando la clave de API
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                version: "weekly"//Se encarga de actualizar la API de Maps semanalmente
            });
            //Trae la libreria del mapa y del marcador
            const { Map } = await loader.importLibrary("maps");
            const { Marker } = await loader.importLibrary("marker");
            //Determina la posicion central del mapa
            const position = {
                lat: -27.331406,
                lng: -55.866329
            };
            //Asigna el centro, el zoom y el id de mapa generado
            const mapOptions = {
                center: position,
                zoom: 15,
                mapId: process.env.NEXT_PUBLIC_MAP_ID
            };
            //Configura el mapa teniendo en cuenta las opciones anteriores
            const map = new Map(mapRef.current, mapOptions);

            /*
            const svgMarker = {
                path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: "blue",
                fillOpacity: 0.6,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(0, 20),
            };

            //Pone el marcador
            const marker = new Marker({
                map: map,
                position: position,
                //icon: svgMarker
            });*/
        }
        //LLama la funcion para iniciar el mapa
        initMap();
    }, [])
    return (
        <div style={{ height: "92vh", width: "100vw" }} ref={mapRef} />
    )
};

export default Map;