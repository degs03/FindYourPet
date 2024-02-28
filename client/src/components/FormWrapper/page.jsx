import { Fragment } from "react";
import Image from "next/image";
import { Avatar, Box, Container, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";

const FormWrapper = ({ children }) => {
    const Copyright = (value) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...value}>
                {'Copyright © '}
                <Link
                    color="inherit"
                    href="/"
                    style={{
                        textDecoration: 'none',
                        boxShadow: 'none',
                        color: '#3B3561'
                    }}>
                    FindYourPet
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography >
        );
    }
    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                <Container component="main" maxWidth="xs" disableGutters={true}>{/**Coloca como un componente MAIN y lo dejo su maxWidth a xs O 12 */}
                    <Box
                        sx={{
                            padding: 5,
                            mb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(248, 248, 248, 0.507)',
                            borderRadius: 3,
                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#3B3561' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {children}
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Container>
            </Box>
        </Fragment >
    )
}

export default FormWrapper;