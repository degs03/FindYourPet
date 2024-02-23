"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Avatar} from '@mui/material';
import { findAllPosts } from '@/app/api/route';
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
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    borderRadius: '20px',
    width: '200px'
});
const Map = () => {
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

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    console.log(height);
    console.log(width)
    const getLocation = async () => {
        try {
            const result = await findAllPosts();
            console.log(result);
            setPosts(result)
        } catch (error) {
            console.log({ error: error })
        }
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: { lg: '30vw', md: '50vw', sm: '70vw', xs: '98vw' }, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <IconButton onClick={toggleDrawer(anchor, false)} sx={{ ml: 2 }}>
                <ClearIcon fontSize="large" />
            </IconButton>
            <Grid item sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5">
                    Avistamientos cercanos
                </Typography>
            </Grid>
            <Grid item>
                {markerRadius.map((item, idx) => (
                    <Grid key={idx}>
                        <Box item key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 2, px: 2 }}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Remy Sharp" src={`${item.image}`} />
                            </StyledBadge>
                            <Grid sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                                <Typography sx={{ ml: 2 }} >{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{dist[idx] < 1.000 ? Math.round(dist[idx] * 1000) + ' m' : dist[idx].toFixed(2) + ' km'}</Typography>
                            </Grid>
                        </Box>
                    </Grid>
                ))}
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
                new mapboxgl.Marker(el)
                    .setLngLat([item.location[0].lng, item.location[0].lat])
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
        <Container maxWidth='xl' sx={{ height: "100%", width: "100%", display: 'flex', alignSelf: 'center' }}>
            <Grid container>
                <Grid item lg={3} xs={12}
                    sx={{
                        bgcolor: 'white',
                        width: "60%",
                        display: 'flex',
                        flexDirection: 'column',
                        py: 3,
                        px: 3,
                        height: { lg: '80vh', sm: '12vh', xs: '12.5vh' },
                        borderRadius: { lg: '20px 0px 0px 20px', xs: '20px 20px 0px 0px' }
                    }}
                >
                    <Grid item sx={{ border: '1px solid', borderRadius: '20px', display: 'flex' }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Busca avistamientos"
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    {
                        width >= 1200 ?
                            <Grid container sx={{ display: 'flex', flexDirection: 'column', my: 5 }}>

                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    Avistamientos mas cercanos a tu zona:
                                </Typography>

                                <Grid item sx={{mt:2}}>
                                    {markerRadius.map((item, idx) => (
                                        <Grid key={idx}>
                                            <Box item key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                <StyledBadge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    variant="dot"
                                                >
                                                    <Avatar alt="Remy Sharp" src={`${item.image}`} />
                                                </StyledBadge>
                                                <Grid sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                                                    <Typography sx={{ ml: 2 }} >{item.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{dist[idx] < 1.000 ? Math.round(dist[idx] * 1000) + ' m' : dist[idx].toFixed(2) + ' km'}</Typography>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid> :
                            <Grid>
                                <AppBar color="transparent" sx={{ top: 'auto', bottom: 0, widows: '100%', boxShadow: 'none', display: 'flex' }}>
                                    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <StyledFab aria-label="add" onClick={toggleDrawer('right', true)} sx={{ top: -20 }}>
                                            <Grid item sx={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                                                <Typography sx={{ mt: 0.88 }}>Avistamientos</Typography>
                                                <DrawIcon sx={{ height: '10px', width: '10px' }} />
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
                <Grid item lg={9} xx={12} ref={mapContainer}
                    sx={{
                        width: "100%",
                        height: { lg: '80vh', sm: '78vh', xs: '80vh' },
                        borderRadius: { lg: '0px 20px 20px 0px', xs: '0px 0px 20px 20px' }
                    }} />
            </Grid>
        </Container>
    )
};

export default Map;