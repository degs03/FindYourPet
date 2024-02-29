'use client'
import NavBar from "@/components/NavBar/page";
import { Avatar, CardMedia, Container, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { selectUser, updatePhone } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addPhone, deletePost, findUser } from "../api/route";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styButton } from "@/components/Styles/styles";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const textFieldSty = {
    '& label.Mui-focused': {
        color: 'black'
    },
    '& .MuiInput-underline:before': { borderBottomColor: '#3B3561' },
    '& .MuiInput-underline:after': { borderBottomColor: '#3B3561' },
}

const Account = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [postId, setPostId] = useState();
    const [number, setNumber] = useState();
    const [userPost, setUserPost] = useState();
    const currentUser = useAppSelector(selectUser);
    const dispatch = useDispatch();
    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenDel = (id) => {
        setOpenDel(true);
        setPostId(id);
    };

    const handleCloseDel = () => {
        setOpenDel(false);
    };

    const UserPost = async () => {
        try {
            const result = await findUser(currentUser._id);
            setUserPost(result);
        } catch (error) {
            console.log({ error: error })
        }
    }

    useEffect(() => {
        UserPost();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    const id = currentUser._id;
    const createNewPhone = async () => {
        const data = { phone: number };
        try {
            await addPhone(id, data);
            dispatch(updatePhone({ phone: number }));
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const result = await deletePost(id);
            console.log(result);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Publicación eliminada correctamente.",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            UserPost();
        } catch (error) {
            console.log({ error: error })
        }
    }

    return (
        <Fragment>
            <NavBar />
            <Container sx={{ mt: { md: '5vh', xs: '2vh' }, mb:3}} maxWidth="md">
                {width > 900 ?
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/")}>
                                Volver
                            </Button>
                        </Grid>
                        <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/posts")}>
                                Todas las publicaciones
                            </Button>
                            <Button variant="contained" sx={styButton} onClick={() => router.push("/posts/new")}>
                                Agregar publicación
                            </Button>
                        </Grid>
                    </Grid> : null}
            </Container>
            <Container maxWidth='md' sx={{ bgcolor: 'white', p: 4, height: '100%', borderRadius: '25px', mb: { md: '8vh', xs: '5vh' } }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }} >
                    <Grid item md={6} xs={12} sx={{ display: 'flex', flexDirection: 'column', height: { xs: '60vh', md: '40vh' }, mt: 2 }}>
                        <Grid item sx={{ mb: 2 }}>
                            <Avatar {...stringAvatar(`${currentUser.firstName} ${currentUser.lastName}`)} sx={{ height: '4rem', width: '4rem' }} />
                        </Grid>
                        <Typography variant="h4">
                            {currentUser.firstName} {currentUser.lastName}
                        </Typography>
                        <Grid item sx={{ display: 'flex', gap: '20px', mt: 3 }}>
                            <AttachEmailOutlinedIcon sx={{ color: "#3B3561" }} />
                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</Typography>
                        </Grid>
                        <Grid item sx={{ display: 'flex', gap: '20px', my: 3, alignItems: 'center' }}>
                            <PhoneOutlinedIcon sx={{ color: "#3B3561" }} />
                            <Typography>
                                {currentUser.phone ? currentUser.phone : "Añadir"}
                            </Typography>
                            <IconButton onClick={handleClickOpen} sx={{ ml: -2, mb: 0.5 }}>
                                <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Grid>

                    </Grid>
                    <Grid item md={6} xs={12} sx={{ display: 'flex', flexDirection: 'column', mt: { xs: -25, md: 0 } }}>
                        <Typography variant="h5" fontWeight={'bold'} sx={{ color: "#3B3561" }}>
                            Actividades recientes:
                        </Typography>
                        <Grid item sx={{ width: '100%', borderRadius: '20px' }}>
                            {userPost?.posts.map((item, idx) => {
                                return (
                                    <Grid container key={idx} sx={{ display: 'flex', p: 2, width: '100%' }}>
                                        <Grid item xs={12} sm={5} md={5} lg={5} sx={{ mr: 2 }}>
                                            <CardMedia
                                                sx={{ width: { md: '100%', xs: '100%' }, height: { md: "100%", xs: '100%' }, borderRadius: 2, ml: 1 }}
                                                component="img"
                                                src={item.image[0]}
                                                alt="Product Image"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ width: { md: '100vw', xs: '50', sm: '50vw' }, mt: 2 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bolder', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', height: "20vh" }}>
                                                {item.description}
                                            </Typography>
                                            <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <IconButton onClick={() => router.push(`/posts/edit/${item._id}`)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleClickOpenDel(item._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: '100%', mt: 2 }} />
                                    </Grid>
                                );
                            })}
                            <Dialog
                                open={openDel}
                                onClose={handleCloseDel}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title"  sx={{ color: "#3B3561" }}>
                                    {"¿Está seguro que desea eliminar esta publicación?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleCloseDel} sx={{ color: "#3B3561", '&:hover': { backgroundColor: "#EFEEF6" } }}>Cancelar</Button>
                                    <Button 
                                    onClick={() => {
                                        handleCloseDel();
                                        handleDelete(postId);
                                    }} 
                                    sx={{ color: "#3B3561", '&:hover': { backgroundColor: "#EFEEF6" } }}
                                    autoFocus>
                                        Eliminar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle sx={{ color: "#3B3561" }}>Escribe un numero de celular: </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            sx={textFieldSty}
                            id="phone"
                            name="phone"
                            label="Numero"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: "#3B3561", '&:hover': { backgroundColor: "#EFEEF6" } }} onClick={handleClose}>Cancelar</Button>
                        <Button sx={{ color: "#3B3561", '&:hover': { backgroundColor: "#EFEEF6" } }} type="submit" onClick={createNewPhone}>Guardar</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Fragment>
    )
}

export default Account;