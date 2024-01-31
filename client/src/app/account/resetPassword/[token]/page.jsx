'use client'

import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const { Fragment, useState, useEffect } = require("react")

const resetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const router = useRouter();
    const [alert, setAlert] = useState(false);
    const { token } = useParams();

    const reset = async (data) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/user/resetPassword/${token}`, data);
            const result = await response.data;
            console.log(result);
            router.push('/account/login');
            setAlert(true);
        } catch (error) {
            setError(error);
            console.log(error);
            const validationErrors = error.response.data;
            setError({
                password: validationErrors.password,
                confirmPassword: validationErrors.confirmPassword,
            })
            console.log(error);
            setInvalidError(error.response?.data.message )
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
                                    name="password"
                                    label="Password"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={error?.password ? true : false}
                                    helperText={error?.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name="password"
                                    label="Confirm Password"
                                    fullWidth
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
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={handleFormSubmit}
                                        >
                                            Cambiar Contraseña
                                        </Button>
                                    </Grid>
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


export default resetPassword; 