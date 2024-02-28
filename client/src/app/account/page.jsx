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
import { addPhone, findUser } from "../api/route";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styButton } from "@/components/Styles/styles";
import { useRouter } from "next/navigation";
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

const Account = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState();
    const [userPost, setUserPost] = useState();;
    const currentUser = useAppSelector(selectUser);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const UserPost = async () => {
        try {
            const result = await findUser(currentUser._id);
            console.log(result);
            setUserPost(result);
        } catch (error) {
            console.log({ error: error })
        }
    }

    useEffect(() => {
        UserPost();
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

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth='md' sx={{ bgcolor: 'white', p: 4, height: '100%', borderRadius: '25px', mt: { md: '12vh', xs: '5vh' } }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }} >
                    <Grid item md={6} xs={12} sx={{ display: 'flex', flexDirection: 'column', height: { xs: '60vh', md: '40vh' }, mt: 2 }}>
                        <Grid item sx={{ mb: 2 }}>
                            <Avatar {...stringAvatar(`${currentUser.firstName} ${currentUser.lastName}`)} sx={{ height: '4rem', width: '4rem' }} />
                        </Grid>
                        <Typography variant="h4">
                            {currentUser.firstName} {currentUser.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 5 }}>
                            Contact me:
                        </Typography>
                        <Grid item sx={{ display: 'flex', gap: '20px', mt: 3 }}>
                            <AttachEmailOutlinedIcon />
                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</Typography>
                        </Grid>
                        <Grid item sx={{ display: 'flex', gap: '20px', mt: 3, alignItems: 'center' }}>
                            <PhoneOutlinedIcon />
                            <Typography>
                                {currentUser.phone}
                            </Typography>
                            <IconButton onClick={handleClickOpen}>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                    <Grid item md={6} xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" fontWeight={'bold'}>
                            Actividades Recientes
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
                                            <Typography variant="h6" color="text.secondary" mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.description}
                                            </Typography>
                                            <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: '100%', mt: 2 }} />
                                    </Grid>
                                );
                            })
                            }
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
                    <DialogTitle>Escribe un numero de celular: </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={createNewPhone}>Guardar</Button>
                    </DialogActions>
                </Dialog>
                <Grid item style={{ display:'flex', width:'100%', justifyContent: "flex-end" }}>
                    <Button onClick={() => router.push('/')} sx={styButton}>
                        Volver
                    </Button>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default Account;