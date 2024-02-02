'use client'
//import Dropzone from "@/components/Dropzone/page";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import PetsSharpIcon from '@mui/icons-material/PetsSharp';
//mapBox imports
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker, GeolocateControl } from "react-map-gl";
const PostForm = ({ onSubmit, preset = {} }) => {
    const router = useRouter();
    const [error, setError] = useState({});
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState({});
    const [image, setImage] = useState("");
    const [viewport, setViewport] = useState({}); // se van a guardar la ubicacion actual latitud y longitud

    const createdOk = () => { router.push("/") };
    const createdFail = (errorMsg) => {
        if (errorMsg.response?.data?.error?.errors?.message) {
            const validationErrors = errorMsg.response.data.error.errors.message;
            console.log(validationErrors);
            setError({
                title: validationErrors.title,
                name: validationErrors.name,
                age: validationErrors.age,
                species: validationErrors.species,
                breed: validationErrors.breed,
                description: validationErrors.description,
                location: validationErrors.location,
                image: validationErrors.image
            });
            onFail(error);
            console.log(error);
        } else if (errorMsg.response?.data?.error.errors) {
            const validationErrors = errorMsg.response.data.error.errors;
            console.log(validationErrors);
            setError({
                title: validationErrors.title,
                name: validationErrors.name,
                age: validationErrors.age,
                species: validationErrors.species,
                breed: validationErrors.breed,
                description: validationErrors.description,
                location: validationErrors.location,
                image: validationErrors.image
            })
        } else {
            createdOk();
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: title,
            name: name,
            age: age,
            species: species,
            breed: breed,
            description: description,
            location: location,
            image: image,
        }
        onSubmit(data, createdOk, createdFail);
    }
    useEffect(() => {
        if (
            preset.title &&
            preset.name &&
            preset.age &&
            preset.species &&
            preset.description &&
            preset.location &&
            preset.image
        ) {
            setTitle(preset.title);
            setName(preset.name);
            setAge(preset.age);
            setSpecies(preset.species);
            setDescription(preset.description);
            setLocation(preset.location);
            setImage(preset.image);
        }
    }, [preset]);

    //--------------------------MAPBOX-------------------------------->
    //Mediante el evento, quita longitud y latitud donde se clickeo
    const handleLocation = (e) => {
        setLocation(e.lngLat);
    }

    useEffect(() => {
        /*Se usa la API de geolocalización del navegador para obtener nuestra ubicación actual durante el tiempo de carga y configurando
        el resultado como nuestra ventana gráfica predeterminada*/
        navigator.geolocation.getCurrentPosition((pos) => {
            //se setea la ubicacion actual del usuario 
            setViewport({
                ...viewport, //ubicacion anterior
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 14,
            });
        });
    }, []);
    return (
        <Fragment>
            <Container component="main" maxWidth="lg">
                <Box sx={{ mt: 8 }}>
                    <Box component="form" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name="title"
                                    label="Título"
                                    fullWidth
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    error={error?.title ? true : false}
                                    helperText={error?.title?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex" }} >
                                <TextField
                                    required
                                    name="name"
                                    label="Nombre de la mascota"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={error?.name ? true : false}
                                    helperText={error?.name?.message}
                                    sx={{ mr: 2 }}
                                />
                                <TextField
                                    required
                                    name="age"
                                    label="Edad"
                                    fullWidth
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    error={error?.age ? true : false}
                                    helperText={error?.age?.message}
                                    sx={{ mr: 2 }}
                                />
                                <TextField
                                    select
                                    defaultValue="Años"
                                    fullWidth
                                >
                                    <MenuItem value="Años">
                                        Años
                                    </MenuItem>
                                    <MenuItem value="Meses">
                                        Meses
                                    </MenuItem>
                                    <MenuItem value="Semanas">
                                        Semanas
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex" }} >
                                <TextField
                                    required
                                    name="species"
                                    label="Especie"
                                    fullWidth
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}
                                    error={error?.species ? true : false}
                                    helperText={error?.species?.message}
                                    sx={{ mr: 2 }}
                                />
                                <TextField
                                    required
                                    name="breed"
                                    label="Raza"
                                    fullWidth
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                    error={error?.breed ? true : false}
                                    helperText={error?.breed?.message}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name="description"
                                    label="Descripción"
                                    fullWidth
                                    multiline
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    error={error?.description ? true : false}
                                    helperText={error?.description?.message}
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name="image"
                                    label="Imagen"
                                    fullWidth
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    error={error?.image ? true : false}
                                    helperText={error?.image?.message}
                                />
                                {/*<Dropzone />*/}
                            </Grid>
                            {
                                //Pregunta si existe la latitud y longitud
                                viewport.latitude && viewport.longitude && (
                                    <Grid item xs={12} sx={{ height: 400 }} >
                                        <Typography>Indique la ultima zona</Typography>
                                        <Map
                                            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                                            attributionControl={false}
                                            initialViewState={viewport} //inserta como valores iniciales lo asignado a viewport
                                            onClick={handleLocation}
                                            mapStyle='mapbox://styles/mapbox/streets-v12'
                                        >
                                            <GeolocateControl
                                                positionOptions={{ enableHighAccuracy: true }}
                                                trackUserLocation={true}
                                            />
                                            {
                                                location.lat && location.lng ?
                                                    <Marker
                                                        latitude={location.lat}
                                                        longitude={location.lng}
                                                    >
                                                        <PetsSharpIcon />
                                                    </Marker> : null
                                            }
                                        </Map>
                                    </Grid>
                                )
                            }
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={handleFormSubmit}
                                        >
                                            Publicar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Fragment >
    )
}

export default PostForm;