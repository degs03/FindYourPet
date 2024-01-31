'use client'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from "next/navigation";
import Link from "next/link";
const { Fragment, useState, useEffect } = require("react")
const UserForm = ({ onSubmit, preset = {}, isSignUp }) => { //preset trae data
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const createdOk = () => {
        if (isSignUp) {
            router.push("/account/login");
        }
        router.push("/");
    };
    const createdFail = (errorMsg) => {
        if (errorMsg.response?.data?.message?.errors) {
            const validationErrors = errorMsg.response.data.message.errors;
            console.log(validationErrors);
            setError({
                firstName: validationErrors.firstName,
                lastName: validationErrors.lastName,
                email: validationErrors.email,
                password: validationErrors.password,
                confirmPassword: validationErrors.confirmPassword,
            });
        } else if (errorMsg.response?.data) {
            const validationErrors = errorMsg.response.data;
            console.log(validationErrors);
            setError({
                email: validationErrors.email,
                password: validationErrors.password
            })
            console.log(error);
        } else {
            createdOk();
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const data = {
            firstName: isSignUp ? firstName : null,
            lastName: isSignUp ? lastName : null,
            email: email,
            password: password,
            confirmPassword: isSignUp ? confirmPassword : null
        }
        onSubmit(data, createdOk, createdFail);
    }
    useEffect(() => {
        if (
            preset.firstName &&
            preset.lastName &&
            preset.email &&
            preset.password &&
            preset.confirmPassword
        ) {
            setFirstName(preset.firstName);
            setLastName(preset.lastName);
            setEmail(preset.email);
            setPassword(preset.password);
            setConfirmPassword(preset.confirmPassword);
        }
    }, [preset]);
    useEffect(() => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            firstName: error.firstName ? error.firstName.message : "",
            lastName: error.lastName ? error.lastName.message : "",
            email: error.email ? error.email.message : "",
            password: error.password ? error.password.message : "",
            confirmPassword: error.confirmPassword ? error.confirmPassword.message : "",
        }));
    }, [error]);
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
                        {isSignUp == true ? ('Sign up') : ('Sign in')}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>{/*mt = margin bottom */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {isSignUp == true ? (
                                    <TextField
                                        required
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            setFormErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                                        }}
                                        error={formErrors.firstName ? true : false}
                                        helperText={formErrors.firstName}
                                    />) : null}
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                {isSignUp == true ? (
                                    <TextField
                                        required
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            setFormErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
                                        }}
                                        error={formErrors.lastName ? true : false}
                                        helperText={formErrors.lastName}
                                    />) : null}
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    name="email"
                                    label="E-mail"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                                    }}
                                    error={formErrors.email ? true : false}
                                    helperText={formErrors.email}
                                />
                            </Grid>
                            {isSignUp == true ? (
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setFormErrors((prevErrors) => ({ ...prevErrors, password: "" }));
                                        }}
                                        error={formErrors.password ? true : false}
                                        helperText={formErrors.password}
                                    />
                                </Grid>
                            ) :
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setFormErrors((prevErrors) => ({ ...prevErrors, password: "" }));
                                        }}
                                        error={formErrors.password ? true : false}
                                        helperText={formErrors.password}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12} sm={6} >
                                {isSignUp == true ? (
                                    <TextField
                                        required
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setFormErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
                                        }}
                                        error={formErrors.confirmPassword ? true : false}
                                        helperText={formErrors.confirmPassword}
                                    />) : null}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleFormSubmit}
                                >
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {isSignUp ?
                                    (
                                        <Link href="/account/login" variant="body2">
                                            Ya tienes una cuenta? Inicia sesion.
                                        </Link>
                                    ) :
                                    (
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/account/register" variant="body2">
                                                    Aun no tienes una cuenta? Registrate.
                                                </Link>
                                            </Grid>
                                            <Grid item sx={{mt:2}}>
                                                <Link href="/account/forgotPassword" variant="body2">
                                                    Olvidaste tu contraseña?
                                                </Link>
                                            </Grid>
                                        </Grid>

                                    )
                                }
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Container>
        </Fragment >
    )
}
export default UserForm; 