const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio."],
        minLength: [2, "Debe ser mayor a 2 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "El apellido es obligatorio."],
        minLength: [2, "Debe ser mayor a 2 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    email: {
        type: String,
        trim: true, //Elimina los espacios en blanco al inicio y al final
        lowercase: true, //Convierte todo a minuscula antes de enviar el formulario
        unique: true,
        required: [true, "El email es obligatorio."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Por favor, ingrese un email válido."
        }
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        minLength: [8, "La contraseña debe tener mas de 8 caracteres."],
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }],
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date

}, { timestamps: true, versionkey: false });
//ESTOS SON MIDDLEWARE: Procesos en medio

// crea un esquema virtual o temporal para hacer la confirmacion de la contrasenia
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// ANTES DE VALIDAR verifica si las contrasenia son iguales 
UserSchema.pre('validate', function (next) {
    if (!this.confirmPassword) {
        this.invalidate('confirmPassword', 'Este campo es requerido.');
    } else if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben coincidir.');
    }
    next();
});
//antes de guardar se ejecuta esto y hashea la contrasenia
// this should go after 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();// hace que se ejecute lo siguiente
        });
});

UserSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');//los bytes a utilizar y convierte a string en hexadecimal
    /* 
    En este caso se especifica el algoritmo a usar que es el sha256, se especifica que campo queremos encriptar
    Y el digest nos especifica en que formato queremos encriptar, el formato utilizado es el 'hex' o el hexadesimal    
    */
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000; // tiempo a expirar, 10 minutos

    console.log(resetToken, this.passwordResetToken);

    return resetToken;
}


const User = new mongoose.model("User", UserSchema);

module.exports = User;