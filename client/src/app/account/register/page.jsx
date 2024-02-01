'use client'
import UserForm from "@/components/UserForm/page";
import axios from "axios";
import Swal from 'sweetalert2';

const { Fragment } = require("react")

const Register = () => {
    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/new", data);
            const result = await response.data;
            console.log(result);
            onSuccess(result);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor:"white",
                position: "bottom",
                color: "white",
                title: "Se ha creado la cuenta correctamente",
                background:"#a5dc86",
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