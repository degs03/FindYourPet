'use client'

import { register } from "@/app/api/route";
import UserForm from "@/components/UserForm/page";
import Swal from 'sweetalert2';

const { Fragment } = require("react")

const Register = () => {
    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const result = await register(data);
            console.log(result);
            onSuccess(result);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Se ha registrado correctamente.",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            onFail(error);
        }
    }
    return (
        <Fragment>
            <UserForm isSignUp={true} onSubmit={createNewUser} />
        </Fragment>
    )
}
export default Register;