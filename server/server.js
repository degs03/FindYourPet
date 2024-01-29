require('dotenv').config(); //.config para que configure las variables de entorno
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cookieParser());

require("./config/mongoose.config");
app.use(cookieParser());
app.use(
    cors({
        credentials: true,//nos permite responder con nuestros elementos y leer las coockies
        origin: [`http://localhost:3000`,]
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postRoutes = require("./routes/post.routes");
app.use('/api/post', postRoutes);

const userRoutes = require("./routes/user.routes");
app.use('/api/user', userRoutes);

app.listen(port, () => console.log(`listen port: ${port}`));