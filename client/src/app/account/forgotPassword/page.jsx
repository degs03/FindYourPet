'use client'

import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";

const { Fragment, useState, useEffect } = require("react")




const forgotPassword = ({ onSubmit, preset = {} }) => { //preset trae data
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    const createdFail = (errorMsg) => {
        if (errorMsg.response?.data?.message?.errors) {
            const validationErrors = errorMsg.response.data.message.errors;
            console.log(validationErrors);
            setError({
                email: validationErrors.email
            });
        } else if (errorMsg.response?.data) {
            const validationErrors = errorMsg.response.data;
            console.log(validationErrors);
            setError({
                email: validationErrors.email
            })
            console.log(error);
        } else {
            createdOk();
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: email
        }
        onSubmit(data, createdOk, createdFail);
    }
    useEffect(() => {
        if (preset.email) {
            setEmail(preset.email);
        }
    }, [preset]);
    const Copyright = (value) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...value}>
                {'Copyright © '}
                <Link color="inherit" href="/">
                    FindYourPet
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    return (
        <Fragment>
            <Container component="main" maxWidth="xs">{/**Coloca como un componente MAIN y lo dejo su maxWidth a xs O 12 */}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Recupera tu contraseña!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>{/*mt = margin bottom */}
                        <Grid item xs={12} >
                            <TextField
                                required
                                name="email"
                                label="E-mail"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error.email ? true : false}
                                helperText={error.email?.message}
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
                                        Enviar email
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Container>
        </Fragment >
    )
}


export default forgotPassword; 