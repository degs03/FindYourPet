'use client'
import Dropzone from "@/components/Dropzone/page";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography, Stepper, Step, StepLabel, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import PetsSharpIcon from '@mui/icons-material/PetsSharp';
// mapBox imports
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker, GeolocateControl } from "react-map-gl";
import { usePostContext } from "../../app/context/PostContext";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/users/userSlice";
import { styButton } from "../Styles/styles";

const textFieldSty = {
    '& label.Mui-focused': {
        color: '#3B3561'
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#3B3561'
        }
    }
}

const StyledButton = styled(Button)({
    color: '#3B3561',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: "#EFEEF6",
    },
})

const PostForm = ({ onSubmit, preset = {} }) => {
    const router = useRouter();
    const currentUser = useAppSelector(selectUser);
    const { downloadURLs } = usePostContext();
    const [filesUploaded, setFilesUploaded] = useState(true);
    const [error, setError] = useState({});
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [ageType, setAgeType] = useState("años");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState([]);
    const [image, setImage] = useState("");
    const [viewport, setViewport] = useState({}); // se van a guardar la ubicacion actual latitud y longitud
    const [width, setWidth] = useState(window.innerWidth);

    const steps = ['Complete el formulario', 'Añade la imagen de tu mascota', 'Indique la última zona de ubicación'];


    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const handleFilesUploaded = (uploaded) => {
        setFilesUploaded(uploaded);
    };

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
        e.preventDefault();
        let fullAge = age + " " + ageType;
        const data = {
            title: title,
            name: name,
            age: age !== "" ? fullAge : age,
            species: species,
            breed: breed,
            description: description,
            location: location.length === 0 ? null : location,
            image: downloadURLs == "" ? null : downloadURLs,
            user: currentUser._id
        }
        console.log(data.location)
        onSubmit(data, createdOk, createdFail);
    }
    useEffect(() => {
        if (
            preset.title &&
            preset.name &&
            preset.age &&
            preset.species &&
            preset.breed &&
            preset.description &&
            preset.location &&
            preset.image
        ) {
            let ageAndType = preset.age.split(/(\d+)/).filter(Boolean).map(str => isNaN(str) ? str.trim() : str);
            setTitle(preset.title);
            setName(preset.name);
            setAge(ageAndType[0]);
            setAgeType(ageAndType[1]);
            setSpecies(preset.species);
            setBreed(preset.breed);
            setDescription(preset.description);
            setLocation(preset.location[0]);
            setImage(preset.image);
        }
    }, [preset]);

    //--------------------------MAPBOX-------------------------------->
    //Mediante el evento, quita longitud y latitud donde se clickeo
    const handleLocation = (e) => {
        setLocation({
            lng: e.lngLat.lng,
            lat: e.lngLat.lat
        });
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

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // MUI-STEPPER
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const isStepFailed = (step) => {
        if(error.title || error.name || error.age || error.species || error.breed || error.description){
            return step === 0;
        }else if(error.image){
            return step === 1;
        }else if(error.location){
            return step === 2;
        }
    };

    return (
        <Fragment>
            <Container sx={{ my: 2 }} maxWidth="xl">
                {width > 900 ?
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/")}>
                                Inicio
                            </Button>
                        </Grid>
                        <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/posts")}>
                                Todas las publicaciones
                            </Button>
                        </Grid>
                    </Grid> : null}
            </Container>
            <Container component="main" maxWidth="xl" sx={{ backgroundColor: "#FFF", borderRadius: 3 }}>
                <Box sx={{ padding: 5 }}>
                    <Stepper activeStep={activeStep} sx={{ mt: 3, mb: { xs: 3, sm: 7 } }}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepFailed(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption" color="error">
                                        {width > 600 ? "Alert message" : ""}
                                    </Typography>
                                );

                                labelProps.error = true;
                            }
                            return (
                                <Step
                                    key={label}
                                    {...stepProps}
                                    sx={{
                                        '& .MuiStepLabel-root .Mui-completed': {
                                            color: `${labelProps.error? "#d32f2f" : "#3B3561"}`, // circle color (COMPLETED)
                                        },
                                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                        {
                                            color: '#3B3561', // Just text label (COMPLETED)
                                        },
                                        '& .MuiStepLabel-root .Mui-active': {
                                            color: `${labelProps.error? "#d32f2f" : "#3B3561"}`, // circle color (ACTIVE)
                                        },
                                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                        {
                                            color: '#3B3561', // Just text label (ACTIVE)
                                        },
                                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                            fill: 'white', // circle's number (ACTIVE)
                                        },
                                    }}>
                                    <StepLabel {...labelProps}>{width > 600 ? label : ""}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {activeStep === 0 &&
                                <Box component="form" noValidate>
                                    {width > 600 ? null : <Typography variant="h6" sx={{ color: "#3b3561", display: "flex", justifyContent: "center", mb: 3, fontSize: "1.1rem" }}>{steps[activeStep]}</Typography>}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                name="title"
                                                label="Título"
                                                sx={textFieldSty}
                                                fullWidth
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                error={error?.title ? true : false}
                                                helperText={error?.title?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                name="name"
                                                label="Nombre de la mascota"
                                                fullWidth
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                error={error?.name ? true : false}
                                                helperText={error?.name?.message}
                                                sx={{
                                                    mr: 3,
                                                    '& label.Mui-focused': {
                                                        color: '#3B3561'
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3B3561'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
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
                                                sx={{
                                                    mr: 3,
                                                    '& label.Mui-focused': {
                                                        color: '#3B3561'
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3B3561'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                select
                                                label="Seleccione el tiempo"
                                                sx={textFieldSty}
                                                fullWidth
                                                value={ageType}
                                                onChange={(e) => setAgeType(e.target.value)}
                                            >
                                                <MenuItem value="años">
                                                    Años
                                                </MenuItem>
                                                <MenuItem value="meses">
                                                    Meses
                                                </MenuItem>
                                                <MenuItem value="semanas">
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
                                                sx={{
                                                    mr: 3,
                                                    '& label.Mui-focused': {
                                                        color: '#3B3561'
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3B3561'
                                                        }
                                                    }
                                                }}
                                            />
                                            <TextField
                                                required
                                                name="breed"
                                                label="Raza"
                                                sx={textFieldSty}
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
                                                sx={textFieldSty}
                                                fullWidth
                                                multiline
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                error={error?.description ? true : false}
                                                helperText={error?.description?.message}
                                                rows={4}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            }
                            {activeStep === 1 &&
                                <Grid item xs={12} >
                                    {width > 600 ? null : <Typography variant="h6" sx={{ color: "#3b3561", display: "flex", justifyContent: "center", mb: 3, fontSize: "1.1rem" }}>{steps[activeStep]}</Typography>}
                                    <Dropzone onFilesUploaded={handleFilesUploaded} />
                                </Grid>
                            }
                            {activeStep === 2 &&
                                //Pregunta si existe la latitud y longitud
                                viewport.latitude && viewport.longitude && (
                                    <Grid item xs={12} sx={{ height: "55vh", borderRadius: 3, overflow: "hidden" }} >
                                        {width > 600 ? null : <Typography variant="h6" sx={{ color: "#3b3561", display: "flex", justifyContent: "center", mb: 3, fontSize: "1.1rem" }}>{steps[activeStep]}</Typography>}
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <StyledButton
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </StyledButton>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {activeStep === steps.length - 1 ?
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    sx={styButton}
                                                    onClick={handleFormSubmit}
                                                    disabled={filesUploaded}
                                                >
                                                    Publicar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    :
                                    <StyledButton onClick={handleNext}>
                                        Next
                                    </StyledButton>}
                            </Box>
                        </Fragment>
                    )}
                </Box>
            </Container>
        </Fragment >
    )
}

export default PostForm;