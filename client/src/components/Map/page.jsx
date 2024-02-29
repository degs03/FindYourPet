"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AppBar, Avatar, Badge, Box, Button, Container, Drawer, Fab, Grid, IconButton, InputAdornment, InputBase, TextField, Toolbar, Typography, styled } from '@mui/material';
import { findAllPosts } from '@/app/api/route';
import SearchIcon from '@mui/icons-material/Search';
import styles from "./page.module.css";
import * as geolib from 'geolib';
import ClearIcon from '@mui/icons-material/Clear';
import DrawIcon from '../icons/DrawIcon';
import { styButton } from '../Styles/styles';
import { useRouter } from 'next/navigation';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
const sty = {
    color: '#FFFF',
    '& label.Mui-focused': {
        color: 'black',
        borderColor: 'black'
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            color: 'black',
            borderColor: 'black'
        }
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: 'none'
    },
    width: { xs: '90vw', sm: '90vw' },
    bgcolor: '#e5e7eb',
    borderRadius: '25px'
};
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    borderRadius: '20px',
    width: '200px'
});

const Map = () => {
    const router = useRouter();
    const mapContainer = useRef(null);
    const map = useRef(null); // useRef previene que el mapa se recargue cada vez que el usuario interactue
    const [lng, setLng] = useState(-55.86);
    const [lat, setLat] = useState(-27.34);
    const [zoom, setZoom] = useState(13);
    const [posts, setPosts] = useState();
    const [markerRadius, setMarkerRadius] = useState([]);
    const [dist, setDist] = useState([]);
    const [state, setState] = React.useState({ right: false });
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [search, setSearch] = useState('');
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const filteredMarkers = markerRadius.filter((marker) => {
        return marker.name.toLowerCase().includes(search.toLowerCase());
    })
    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    const getLocation = async () => {
        try {
            const result = await findAllPosts();
            console.log(result);
            setPosts(result);
        } catch (error) {
            console.log({ error: error })
        }
    }

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: Boolean(open) });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: { lg: '30vw', md: '50vw', sm: '70vw', xs: '98vw' }, p: 2 }}
            role="presentation"
        >
            <IconButton onClick={toggleDrawer(anchor, false)} sx={{ ml: 2 }}>
                <ClearIcon fontSize="large" />
            </IconButton>
            <Grid item sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: "#3B3561" }}>
                    Avistamientos cercanos
                </Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', ml: 2, mt: 2 }}>
                <TextField
                    sx={sty}
                    placeholder="Busca avistamientos"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={search}
                    onChange={handleSearchChange}
                />

            </Grid>
            <Grid item>
                {filteredMarkers.length > 0 ?
                    filteredMarkers.map((item, idx) => (
                        <Grid key={idx}>
                            <Box item key={idx}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    m: 1, mx: 2,
                                    p: 1,
                                    width: { xs: '30vh', sm: '50vh' }
                                }}
                                onClick={() => router.push(`/posts/${item._id}`)}
                            >
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                >
                                    <Avatar alt="Remy Sharp" src={`${item.image} `} />
                                </StyledBadge>
                                <Grid sx={{ display: 'flex', width: '90%', flexDirection: 'column' }}>
                                    <Typography sx={{ ml: 2, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{dist[idx] < 1.000 ? Math.round(dist[idx] * 1000) + ' m' : dist[idx].toFixed(2) + ' km'}</Typography>
                                </Grid>
                            </Box>
                        </Grid>
                    )) :
                    (
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 4, ml: 5, color: "#3B3561" }}>
                            No se han encontrado resultados.
                        </Typography>)
                }
            </Grid>
        </Box>
    );
    useEffect(() => {
        // Inicia el mapa solo una vez
        if (map.current) return;

        // Asigna los valores al mapa
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false
        });

        // Guarda la nueva latitud, longitud y zoom cuando el usuario interactua con el mapa
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );
        navigator.geolocation.getCurrentPosition((position) => {
            // Crea un nuevo elemento DOM
            const el = document.createElement('div');
            // Renderiza el botón de Material-UI dentro del elemento DOM
            const root = createRoot(el);
            root.render(
                <Grid item sx={{ backgroundColor: 'white', p: 0.5, borderRadius: '50px' }}>
                    <Avatar sx={{ backgroundColor: '#F05D41', height: '35px', width: '35px' }} />
                </Grid>
            );
            // Usa el elemento DOM como marcador
            new mapboxgl.Marker(el)
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .addTo(map.current);
        });

        // La funcion 'load' espera a que el mapa esté cargado antes de llamar a getLocation
        map.current.on('load', getLocation);

    }, [lng, lat]);


    useEffect(() => {
        if (posts && map.current) {
            // Muestra el marcador en la ubicación proporcionada
            posts.map((item) => {
                // Crear un nuevo elemento DOM
                const el = document.createElement('div');
                el.style.backgroundImage = `url("${item.image[0]}")`;
                el.style.backgroundSize = 'cover';
                el.style.width = '35px';
                el.style.height = '35px';
                el.style.borderRadius = '50%';
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    className: styles['custom-popup']
                })
                    .setHTML(`
                        <div>
                            <div  >
                                <img
                                    class=${styles.popupImage}
                                    height="150"
                                    src="${item.image}"
                                    style="aspect-ratio: 192/192; object-fit: cover;"
                                    width="192"
                                />
                            </div>
                            <div style="background-color: #f3f4f6; padding: 7px; border-radius: 20px">
                                <strong>Nombre:</strong>
                                <span>${item.name}</span>
                                <div>
                                    <p>
                                        <strong >Especie:</strong>
                                        <span>${item.species}</span>
                                    </p>
                                    <p>
                                        <strong >Raza:</strong>
                                        <span>${item.breed}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    `);
                new mapboxgl.Marker(el)
                    .setLngLat([item.location[0].lng, item.location[0].lat])
                    .setPopup(popup)
                    .addTo(map.current);//agrega los marcadores al mapa actual

            });
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                // Filtra los marcadores dentro del radio de 20km
                const markersWithinRadius = posts?.filter((item) => {
                    const markerLocation = {
                        latitude: item.location[0].lat,
                        longitude: item.location[0].lng,
                    };
                    const distance = geolib.getDistance(markerLocation, userLocation);
                    const distanceInKm = distance / 1000; // Convertir la distancia a kilómetros
                    return distanceInKm <= 20;
                });

                // Guarda las distancias de los marcadores dentro del radio de 20 km
                const distancesWithinRadius = markersWithinRadius.map((item) => {
                    const markerLocation = {
                        latitude: item.location[0].lat,
                        longitude: item.location[0].lng,
                    };
                    const distance = geolib.getDistance(markerLocation, userLocation);
                    return distance / 1000; // Convertir la distancia a kilómetros
                });

                setMarkerRadius(markersWithinRadius);
                setDist(distancesWithinRadius);
            })

        }
    }, [posts]);
    return (
        <Container maxWidth='xl' sx={{ height: "100", justifyContent: 'center', mt: '2%' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item lg={3} xs={12}
                    sx={{
                        bgcolor: 'white',
                        alignItems: 'center',
                        py: { lg: 3, md: 0, sm: 0, xs: 0 },
                        px: 3,
                        mr: { md: 0, lg: 5, sm: 0, xs: 0 },
                        height: { lg: '85vh', md: '0vh', sm: '0vh', xs: '0vh' },
                        borderRadius: { lg: '20px 20px 20px 20px', xs: '20px 20px 20px 20px' }
                    }}
                >
                    {
                        width >= 1200 ?
                            <Grid item sx={{ display: 'flex' }}>
                                <TextField
                                    sx={sty}
                                    placeholder="Busca avistamientos"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={search}
                                    onChange={handleSearchChange}
                                />

                            </Grid> :
                            null
                    }
                    {
                        width >= 1200 ?
                            <Grid container sx={{ display: 'flex', flexDirection: 'column', mb: 2, mt: 2 }}>

                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#3B3561' }}>
                                    Avistamientos cercanos a tu zona:
                                </Typography>

                                <Grid item sx={{ mt: 1 }}>
                                    {filteredMarkers.length > 0 ?
                                        filteredMarkers.map((item, idx) => (
                                            <Grid key={idx}>
                                                <Box item key={idx}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        mt: 1,
                                                        cursor:"pointer",
                                                        p: 1,
                                                        width: { lg: '25vh', md: '20vh', sm: '10vh' }
                                                    }}
                                                    onClick={() => router.push(`/posts/${item._id}`)}
                                                >
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    >
                                                        <Avatar alt="Remy Sharp" src={`${item.image} `} />
                                                    </StyledBadge>
                                                    <Grid sx={{ display: 'flex', width: '90%', flexDirection: 'column' }}>
                                                        <Typography sx={{ ml: 2 }} noWrap>{item.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{dist[idx] < 1.000 ? Math.round(dist[idx] * 1000) + ' m' : dist[idx].toFixed(2) + ' km'}</Typography>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                        )) :
                                        (
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 4, color: "#3B3561" }}>
                                                No se han encontrado resultados.
                                            </Typography>)

                                    }
                                </Grid>
                            </Grid> :
                            <Grid>
                                <AppBar color="transparent" sx={{ top: 'auto', bottom: 0, widows: '100%', boxShadow: 'none', display: 'flex' }}>
                                    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <StyledFab aria-label="add" onClick={toggleDrawer('right', true)} sx={{ top: -20 }}>
                                            <Grid item sx={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                                                <Typography sx={{ mt: 0.65, textTransform: "none", mr: 0.3 }}>Avistamientos</Typography>
                                                <DrawIcon sx={{ height: '10px', width: '10px', color: "#3B3561" }} />
                                            </Grid>
                                        </StyledFab>
                                        <Box sx={{ flexGrow: 1 }} />
                                    </Toolbar>
                                </AppBar>
                                <Drawer
                                    anchor={'right'}
                                    open={state['right']}
                                    onClose={toggleDrawer('right', false)}
                                >
                                    {list('right')}
                                </Drawer>
                            </Grid>
                    }
                </Grid>
                <Grid item sx={{ my: 2, width: '90vw' }} lg={8} xs={12}>
                    {width > 900 ?
                        <Grid container >
                            <Grid item sx={{ display: "flex", width: '100%', justifyContent: "space-between", gap: 3, mb: 2, px: 1 }}>
                                <Button variant="contained" sx={styButton} onClick={() => router.push("/posts")}>
                                    Todas las publicaciones
                                </Button>
                                <Button variant="contained" sx={styButton} onClick={() => router.push("/posts/new")}>
                                    Agregar publicación
                                </Button>
                            </Grid>
                        </Grid> : null}
                    <Grid item ref={mapContainer}
                        sx={{
                            height: { lg: '77vh', md: '90vh', sm: '90vh', xs: '86vh' },
                            borderRadius: { lg: '20px 20px 20px 20px', md: '20px 20px 20px 20px', sm: '20px 20px 20px 20px', xs: '20px 20px 20px 20px' }
                        }} />
                </Grid>

            </Grid>
        </Container >
    )
};

export default Map;