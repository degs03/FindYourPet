'use client'
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import FormWrapper from "@/components/FormWrapper/page";
import { passwordReset } from "@/app/api/route";

const { useState, useEffect } = require("react")

const resetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const router = useRouter();
    const { token } = useParams();
    const reset = async (data) => {
        try {
            const result = await passwordReset(data, token);
            console.log(result);
            router.push('/account/login');
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Se ha cambiado la contraseña!",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        } catch (error) {
            setError(error);
            console.log(error);
            const validationErrors = error.response.data?.message.errors;
            const alertError = error.response.data?.message;
            if (alertError == "El link es invalido o ha expirado!") {
                Swal.fire({
                    toast: true,
                    icon: "error",
                    iconColor: "white",
                    position: "bottom",
                    title: alertError,
                    color: "white",
                    background: "#f27474",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            }
            setError({
                password: validationErrors?.password,
                confirmPassword: validationErrors?.confirmPassword,
            })
            console.log(error);
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const data = {
            password: password,
            confirmPassword: confirmPassword
        }
        reset(data);
    }
    useEffect(() => {
        setError({});
    }, [password, confirmPassword]);

    return (
        <FormWrapper>
            <Typography component="h1" variant="h5" color="#4b3a2e">
                Recupera tu contraseña
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>{/*mt = margin bottom */}
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            name="password"
                            label="Contraseña"
                            fullWidth
                            sx={{
                                backgroundColor: 'rgba(248, 248, 248, 0.507)',
                                '& label.Mui-focused': {
                                    color: '#4b3a2e'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4b3a2e'
                                    }
                                }
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error?.password ? true : false}
                            helperText={error?.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            name="password"
                            label="Confirma tu contraseña"
                            fullWidth
                            sx={{
                                backgroundColor: 'rgba(248, 248, 248, 0.507)',
                                '& label.Mui-focused': {
                                    color: '#4b3a2e'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4b3a2e'
                                    }
                                }
                            }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={error?.confirmPassword ? true : false}
                            helperText={error?.confirmPassword?.message}
                        />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    sx={{
                                        mt: 3,
                                        backgroundColor: "#8a6c54",
                                        '&:hover': {
                                            backgroundColor: "#6b5543",
                                        }
                                    }}
                                    variant="contained"
                                    onClick={handleFormSubmit}
                                >
                                    Cambiar Contraseña
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </FormWrapper >
    )
}


export default resetPassword; 