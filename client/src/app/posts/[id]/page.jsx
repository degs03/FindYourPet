'use client'

import { useEffect, useState } from 'react';
import { findPost } from '@/app/api/route';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Map, Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import { styButton } from '@/components/Styles/styles';

export default function Posts() {
    const router = useRouter();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState({});
    const [viewport, setViewport] = useState({});
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        PostInfo();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const PostInfo = async () => {
        try {
            const result = await findPost(id);
            console.log(result);
            setPost(result);
            setImages(result.image);
            setLocation(result.location[0]);
            setViewport({
                ...viewport,
                latitude: result.location[0].lat,
                longitude: result.location[0].lng,
                zoom: 14
            });
        } catch (error) {
            console.log({ error: error })
        }
    }

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    return (
        <Box>
            <Container sx={{ my: 2 }} maxWidth="xl">
                {width > 900 ?
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/posts")}>
                                Volver
                            </Button>
                        </Grid>
                        <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/")}>
                                Página principal
                            </Button>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/posts/new")}>
                                Agregar publicación
                            </Button>
                        </Grid>
                    </Grid> : null}
            </Container>
            <Container sx={{ py: 4, backgroundColor: "#FFF", my: 2, borderRadius: 3, height:'81vh' }} maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{height:"5vh", overflow:"auto", scrollbarColor:"#C9C8C4 transparent", scrollbarWidth:"thin"}}>{post.title}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3}>
                                <Typography variant='h6' fontSize={"1.1rem"}>Nombre</Typography>
                                <Typography variant='subtitle1' gutterBottom sx={{height:"5vh", overflow:"auto", scrollbarColor:"#C9C8C4 transparent", scrollbarWidth:"thin"}}>{post.name}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={9}>
                                <Typography variant='h6' fontSize={"1.1rem"}>Edad</Typography>
                                <Typography variant='subtitle1' gutterBottom sx={{height:"5vh", overflow:"auto", scrollbarColor:"#C9C8C4 transparent", scrollbarWidth:"thin"}}>{post.age}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3}>
                                <Typography variant='h6' fontSize={"1.1rem"}>Especie</Typography>
                                <Typography variant='subtitle1' gutterBottom  sx={{height:"5vh", overflow:"auto", scrollbarColor:"#C9C8C4 transparent", scrollbarWidth:"thin"}}>{post.species}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={9}>
                                <Typography variant='h6' fontSize={"1.1rem"}>Raza</Typography>
                                <Typography variant='subtitle1' gutterBottom  sx={{height:"5vh", overflow:"auto", scrollbarColor:"#C9C8C4 transparent", scrollbarWidth:"thin"}}>{post.breed}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{height:"13vh", overflow:"auto", scrollbarColor:"#C9C8C4 transparent", scrollbarWidth:"thin"}}>
                                <Typography variant='subtitle1'>{post.description}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} height={"30vh"}>
                            <Typography variant='h5' sx={{ my: 2 }}>Último avistamiento</Typography>
                            <Box sx={{ height: "90%", borderRadius: 3, overflow: "hidden" }}>
                                <Map
                                    {...viewport}
                                    onMove={evt => setViewport(evt.viewport)}
                                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                                    attributionControl={false}
                                    mapStyle='mapbox://styles/mapbox/streets-v12'
                                >
                                    {location.lat && location.lng ?
                                        <Marker
                                            latitude={location.lat}
                                            longitude={location.lng}
                                        >
                                            <RoomIcon fontSize='large' />
                                        </Marker> : null
                                    }
                                </Map>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Carousel height={"70vh"}>
                            {images.map((img, idx) => (
                                <Box key={idx} sx={{ position: "relative", width:'100%', height:'100%' }}>
                                    <Image alt='Pet' src={`${img}`} priority fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                </Box>
                            )
                            )}
                        </Carousel>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

}