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
                icon: "success",
                title: "Se ha creado la cuenta correctamente",
                showConfirmButton: false,
                timer: 1500
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