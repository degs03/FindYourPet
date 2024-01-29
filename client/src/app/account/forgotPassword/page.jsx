'use client'

import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import axios from "axios";

const { Fragment, useState, useEffect } = require("react")




const forgotPassword = () => { //preset trae data
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    const sendEmail = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/forgotPassword", data);
            const result = await response.data;
            console.log(result);
        } catch (error) {
            setError(error);
            console.log(error);
            const validationErrors = error.response.data;
            setError({
                email: validationErrors.email
            })
            console.log(error);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: email
        }
        sendEmail(data);
    }

    useEffect(() => {
        setError({});
    }, [email]);
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
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Recupera tu contraseña!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>{/*mt = margin bottom */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name="email"
                                    label="E-mail"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={error?.email ? true : false}
                                    helperText={error?.email?.message}
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
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/account/register" variant="body2">
                                    Volver a inicio
                                </Link>
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