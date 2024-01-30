"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from './page.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null); // useRef previene que el mapa se recargue cada vez que el usuario interactue
    const [lng, setLng] = useState(-55.86);
    const [lat, setLat] = useState(-27.34);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        // Inicia el mapa solo una vez
        if (map.current) return;

        // Asigna los valores al mapa
        map.current = new mapboxgl.Map({
            container: mapContainer.current, // Le dice a MapBox que renderice el mapa dentro de un elemento DOM especifico
            style: 'mapbox://styles/mapbox/streets-v12', // Estilo que va a tener el mapa
            center: [lng, lat],
            zoom: zoom
        });

        // Guarda la nueva latitud, longitud y zoom cuando el usuario interactua con el mapa
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4)); // toFixed para modificar la cantidad de digitos que tendran ej. 22.54567 => 22.54  
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div className={styles.sidebar}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} style={{ height: "100vh" }} />
        </div>
    )
};

export default Map;