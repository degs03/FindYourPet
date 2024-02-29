'use client'

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import Swal from 'sweetalert2';
import FormWrapper from "@/components/FormWrapper/page";
import { passwordForgot } from "@/app/api/route";
import { styButton } from "@/components/Styles/styles";

const { useState, useEffect } = require("react")

const forgotPassword = () => { //preset trae data
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    const sendEmail = async (data) => {
        try {
            const result = await passwordForgot(data);
            console.log(result);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Se ha enviado el correo correctamente!",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
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

    return (
        <FormWrapper>
            <Typography component="h1" variant="h5" color="#4b3a2e">
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
                            sx={{
                                backgroundColor: 'rgba(248, 248, 248, 0.507)',
                                '& label.Mui-focused': {
                                    color: '#3B3561'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3B3561'
                                    }
                                },
                                mb:2
                            }}
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
                                    sx={styButton}
                                    onClick={handleFormSubmit}
                                >
                                    Enviar email
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item sx={{mt:2}}>
                        <Link 
                        href="/account/login" 
                        variant="body2"
                        style={{
                            textDecoration: 'none',
                            boxShadow: 'none',
                            color: '#3B3561'
                        }}
                        >
                            Volver a inicio
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormWrapper >
    )
}


export default forgotPassword; 