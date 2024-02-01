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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '@fontsource/walter-turncoat';
import '@fontsource/roboto';
    
const pages = ['Todas las publicaciones', 'Agregar publicación'];
const settings = ['Perfil', 'Cerrar sesión'];
const settingsLogin = ['Iniciar sesión'];
const href = ['/posts', '/posts/new'];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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
        <AppBar position="static" sx={{ backgroundColor: '#E4E6C3', paddingTop: 1 }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 1.5,
                            mb: 0.9,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Walter Turncoat, sans-serif',
                            fontSize: '2rem',
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: '#F05D23',
                            textDecoration: 'none'
                        }}
                    >
                        FindYourPet
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: '#F05D23' } }}>
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
                                    <Typography
                                        href={href[idx]}
                                        component="a"
                                        variant="body2"
                                        sx={{
                                            my: 2, mx: 1,
                                            color: '#F05D23',
                                            display: 'block',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {page}
                                    </Typography>
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
                            color: '#F05D23',
                            textDecoration: 'none',
                        }}
                    >
                        FindYourPet
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, idx) => (
                            <Button key={page}
                                    onClick={handleCloseNavMenu}
                                    href={href[idx]}
                                    sx={{
                                        my: 2, mx: 1,
                                        color: '#F05D23',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: 400,
                                        textTransform: 'unset',
                                        display: 'block'
                                    }}
                                >
                                    {page}
                            </Button>
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
                                    color: '#F05D23',
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
                                    color: '#F05D23',
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