const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "El título es obligatorio."],
        trim: true,
        minLength: [5, "Debe ser mayor a 5 caracter."],
        maxLength: [190, "Debe ser menor a 190 caracteres."]
    },
    name: {
        type: String,
        required:[true, "El nombre es obligatorio."],
        trim: true,
        minLength: [1, "Debe ser mayor a 1 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    age: {
        type: String,
        required:[true, "La edad es obligatoria."],
        trim: true
    },
    species: {
        type: String,
        required:[true, "La especie es obligatoria."],
        trim: true,
        minLength: [3, "Debe ser mayor a 3 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    breed: {
        type: String,
        required:[true, "La raza es obligatoria."],
        trim: true,
        minLength: [3, "Debe ser mayor a 3 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    description: {
        type: String,   
        required:[true, "La descripción es obligatoria."],
        trim: true,
        minLength: [1, "Debe ser mayor a 1 caracter."],
        maxLength: [1000, "Debe ser menor a 1000 caracteres."]
    },
    location: {
        type: Object,
        required:[true, "La ubicación es obligatoria."],
    },
    image: {
        type: Array,
        required:[true, "La imagen es obligatoria."]
    },
    status: {
        type: String,
        default: "not found",
        enum: ["not found", "found"]
    },
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: "User"
    }
}, { timestamps: true, versionKey:false});


const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;