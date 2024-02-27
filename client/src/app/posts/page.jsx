'use client'

import { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Fragment } from 'react';
import { findAllPosts } from '../api/route';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { styButton } from '@/components/Styles/styles';
import { useRouter } from 'next/navigation';

const sty = {
    color: '#FFFF',
    '& label.Mui-focused': {
        color: 'black',
        borderColor: 'black'
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            color: 'black',
            borderColor: 'black'
        }
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: 'none'
    },
    width: { xs: '90vw', sm: '94vw', md: "94vw", lg: '290px' },
    bgcolor: '#E0E2E7',
    borderRadius: '25px'
};

export default function Posts() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        PostsInfo();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        filterPosts();
    }, [search]);

    const PostsInfo = async () => {
        try {
            const result = await findAllPosts();
            console.log(result);
            setPosts(result);
            setFilteredPosts(result);
        } catch (error) {
            console.log({ error: error })
        }
    }

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const filterPosts = () => {
        const filtered = posts.filter((posts) =>
            posts.title.toLowerCase().includes(search.toLowerCase()) ||
            posts.description.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    return (
        <Box sx={{ backgroundColor: "#F3F4F6" }}>
            <Container sx={{ py: 4 }} maxWidth="xl">
                {/* End hero unit */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            placeholder="Buscar"
                            variant="outlined"
                            size="small"
                            sx={sty}
                            InputProps={{
                                startAdornment: (
                                    <IconButton sx={{ mr: 0.2 }}>
                                        <SearchIcon />
                                    </IconButton>
                                )
                            }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                    {width > 900 ? <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
                        <Button variant="contained" sx={styButton} onClick={() => router.push("/")}>
                            Página principal
                        </Button>
                        <Button variant="contained" sx={styButton} onClick={() => router.push("/posts/new")}>
                            Agregar publicación
                        </Button></Grid> : null}
                    {filteredPosts.map((card, idx) => (
                        <Grid item key={idx} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.title}
                                    </Typography>
                                    <Typography noWrap>
                                        {card.description}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                        mx: 2,
                                        borderRadius: 1
                                    }}
                                    image={card.image}
                                />
                                <CardActions sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
                                    <ShareIcon />
                                    <Link href={`/posts/${card._id}`} style={{ textDecoration: "none", color: "#3B3561" }}>
                                        Ver más
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );

}