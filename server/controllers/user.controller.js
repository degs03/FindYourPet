const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET_KEY;
const sendEmail = require("../util/email");
const crypto = require("crypto")

//esto se ejecuta una vez que se valida todo en el user.model
module.exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            const newuser = await User.create(req.body);
            res.status(201);
            res.json(newuser);
            return
        }
        res.status(409);
        res.json({ email: { message: "Este email ya ha sido registrado!" } });
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }
};


//Endpoint para logueo
module.exports.login = async (req, res) => {
    try {
        //Bucar usuario
        const user = await User.findOne({ email: req.body.email })
        //si no existe y retorno resultado 
        if (user == null) {
            res.status(404);
            res.json({ email: { message: "Usuario no encontrado" } });
            return
        }
        // Si exite se revisa contrasenia 
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        //si no coincide paro el resultado
        if (validatePassword === false) {
            res.status(401);
            res.json({ password: { message: "Contraseña incorrecta" } });
            console.log(validatePassword);
            return
        }
        //si contrrasenia ok genera jwt y cookie
        const newJWT = jwt.sign({
            _id: user._id
        }, secretKey, { expiresIn: "10m" });
        res.cookie("userToken", newJWT, secretKey, { httpOnly: true });
        res.status(200);
        res.json({ message: "logged ok" })
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }
}

//Guarda las cookies
module.exports.cookie = async (req, res) => {
    try {
        res.cookie("mycookie", "mydata", { httpOnly: true });
        res.json({ message: "ok" });
    } catch (error) {
        res.json({ message: error });
    }
}

//Cerrar sesion
module.exports.loggout = async (req, res) => {
    try {
        res.clearCookie("userToken");
        res.json({ message: "logout succesful" });
        res.status(200);
    } catch (error) {
        res.json({ message: error });
    }
}

//FORGOT PASSWORD
module.exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    try {
        //se busca el usuario por email
        if (!user) {
            res.status(404);
            return res.json({ email: { message: "No podemos encontrar al email proporcionado!" } }); // IMPORTANTE
        }
        //se genera un token random para el usuario
        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false }); //desactiva las validaciones antes de guardar el user
        //enviar al usuario el token
        const resetUrl = `http://localhost:8000/api/user/resetPassword/${resetToken}`;
        const message = resetUrl
        await sendEmail({
            email: user.email,
            subject: 'Solicitud de cambio de contraseña',
            message: message
        });
        return res.status(200).json({
            status: "success",
            message: "El link para cambiar su contraseña, fue mandado a su email!"
        });
    } catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al mandar el email. Intentelo mas tarde." }); // IMPORTANTE
    }
}
/*
**IMPORTANTE NOTA**
Es importante colocar return, debido a que 
En el codigo, puede haber varios lugares donde se manda la respuesta al cliente  de esta manera (res.json() o res.status().json()), y es posible
que el código siga ejecutándose después de haber enviado una respuesta.
Después de enviar una respuesta en el bloque if (!user), hay que agregar un return para salir de la función
y evitar que el código siguiente también intente enviar una respuesta.
*/


module.exports.resetPassword = async (req, res) => {
    const date = Date.now();
    try {
        const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
        console.log('Token:', token);
        console.log('Date:', date);
        const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpire: {$gt: date}});
        console.error(user);
        if (!user) {
            return res.status(404).json({ message: "El link es invalido o ha expirado!" });
        }
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpire = undefined;
        user.passwordChangeAt = Date.now();
        await user.save({ validateBeforeSave: true });
        const newJWT = jwt.sign({
            _id: user._id
        }, secretKey, { expiresIn: "100000s" });
        res.cookie("userToken", newJWT, secretKey, { httpOnly: true });
        res.status(200);
        res.json({ message: "logged ok" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Ha ocurrido un error en el servidor." });
    }
}

//Buscar todos los usuarios
module.exports.findAllUsers = async (req, res) => {
    try {
        const user = await User.find().populate("posts");
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }
};

//Buscar todos los usuarios por id
module.exports.findUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id }).populate("posts");
        if (user) {
            res.status(200);
            res.json(user);
            return;
        }
        res.status(404);
        res.json({ message: "user not found" });
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }
};