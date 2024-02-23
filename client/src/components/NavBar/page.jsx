'use client'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '@fontsource/walter-turncoat';
import '@fontsource/roboto';
import { useCookies } from 'next-client-cookies';
import Swal from 'sweetalert2';
import Link from 'next/link';
const pages = ['Todas las publicaciones', 'Agregar publicación'];
const settings = ['Perfil', 'Cerrar sesión'];
/* const settingsLogin = ['Iniciar sesión']; */
const href = ['/posts', '/posts/new'];

const NavBar = () => {
    const cookies = useCookies();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    // Leer una cookie
    const miCookie = cookies.get('userToken');
    console.log({ cookie: miCookie });
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', paddingTop: 1, boxShadow: 'none' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            mb: 0.9,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Walter Turncoat, sans-serif',
                            fontSize: '2rem',
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: '#3B3561',
                            textDecoration: 'none'
                        }}
                    >
                        FindYourPet
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: '#3B3561' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {pages.map((page, idx) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link key={page}
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            textDecoration: 'none',
                                            fontWeight: 400,
                                            color: '#3B3561',
                                            my: 2
                                        }}
                                        href={href[idx]}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            idx == 1 && !miCookie ?
                                                Swal.fire({
                                                    toast: true,
                                                    icon: "error",
                                                    iconColor: "white",
                                                    position: "bottom",
                                                    color: "white",
                                                    title: "Inicia sesion para crear un post!",
                                                    background: "#f27474",
                                                    showConfirmButton: false,
                                                    timer: 5000,
                                                    timerProgressBar: true,
                                                }) : null
                                        }
                                        }
                                    >
                                        {page}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Walter Turncoat, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: '#3B3561',
                            textDecoration: 'none',
                        }}
                    >
                        FindYourPet
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: { sm: 1, md: 5 } }}>
                        {pages.map((page, idx) => (
                            <Link key={page}
                                style={{
                                    textDecoration: 'none',
                                    my: 2, mx: 2,
                                    fontWeight: 400,
                                }}
                                href={href[idx]}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    idx == 1 && !miCookie ?
                                        Swal.fire({
                                            toast: true,
                                            icon: "error",
                                            iconColor: "white",
                                            position: "bottom",
                                            color: "white",
                                            title: "Inicia sesion para crear un post!",
                                            background: "#f27474",
                                            showConfirmButton: false,
                                            timer: 5000,
                                            timerProgressBar: true,
                                        }) : null
                                }
                                }
                            >
                                {page}
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mb: 1 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{
                                mt: '45px',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                href="/account"
                                component="a"
                                variant="body2"
                                onClick={handleCloseUserMenu}
                                sx={{
                                    my: 2, mx: 1,
                                    color: '#3B3561',
                                    display: 'block',
                                    textDecoration: 'none'
                                }}
                            >
                                {settings[0]}
                            </MenuItem>
                            <MenuItem
                                href="/account"
                                component="a"
                                variant="body2"
                                onClick={handleCloseUserMenu}
                                sx={{
                                    my: 2, mx: 1,
                                    color: '#3B3561',
                                    display: 'block',
                                    textDecoration: 'none'
                                }}
                            >
                                {settings[1]}
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;