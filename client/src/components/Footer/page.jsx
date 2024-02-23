import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Foot() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#A2A0D5'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5} color='white'>
                    <Grid item xs={12} sm={4} >
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            We are the LunarLoom company, dedicated to providing the best t-shirts to our customers.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} color='white'>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" >
                            Encarnacion - PY
                        </Typography>
                        <Typography variant="body2" >
                            Email: gimenezdario6469@gmail.com
                        </Typography>
                        <Typography variant="body2" >
                            Phone: +595 991 892854
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} color='white'>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5} color='white'>
                    <Typography variant="body2"  align="center">
                        {"Copyright © "}
                        <Link color="inherit">
                            LunarLoom
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}