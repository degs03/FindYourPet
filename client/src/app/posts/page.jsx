'use client'

import { useEffect, useState } from 'react';
import {  Card, CardActions, CardContent, CardMedia, Container, Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Fragment } from 'react';
import { findAllPosts } from '../api/route';
export default function Posts() {
    const [posts, setPosts] = useState([]);
    const PostsInfo = async () => {
        try {
            const result = await findAllPosts();
            console.log(result);
            setPosts(result);
            console.log(posts)
        } catch (error) {
            console.log({ error: error })
        }
    }
    useEffect(() => {
        PostsInfo();
    }, []);

    return (
        <Fragment>
            <Container sx={{ py: 8 }} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={2}>
                    {posts.map((card) => (
                        <Grid item key={card} xs={12} sm={6}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image={card.image}  
                                />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.title}
                                    </Typography>
                                    <Typography sx={{ overflowY: "scroll" }}>
                                        {card.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <ShareIcon />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fragment>
    );

}