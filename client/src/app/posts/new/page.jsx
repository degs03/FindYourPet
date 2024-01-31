'use client'

import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useState, useEffect } from "react";

const newPosts = () => {
    const [error, setError] = useState({});
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState({});
    const [image, setImage] = useState("");
    //const [user, setUser] = useState("");

    const newPost = async (data) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/user/post`, data);
            const result = await response.data;
            console.log(result);
        } catch (error) {
            console.log(error);
            const validationErrors = error.response.data;
            setError({
                title: validationErrors.title,
                name: validationErrors.name,
                age: validationErrors.age,
                species: validationErrors.species,
                breed: validationErrors.breed,
                description: validationErrors.description,
                location: validationErrors.location,
                image: validationErrors.image,
            })
            console.log(error);
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
        reset(data);
    }



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
                                    label="Seleccione el tiempo"
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
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Grid item xs={12}>
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

export default newPosts;