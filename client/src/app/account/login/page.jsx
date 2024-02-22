'use client'

import { login } from "@/app/api/route";
import UserForm from "@/components/UserForm/page";
import { setUser, userLogin } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import Swal from 'sweetalert2';

const { Fragment } = require("react")

const Login = () => {
    const dispatch = useAppDispatch();

    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const result = await login(data);
            console.log(result);
            onSuccess(result);
            dispatch(userLogin());
            dispatch(setUser(result.usuario));
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Has iniciado sesión correctamente",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            onFail(error);
            console.log(error);
        }
    }
    return (
        <Fragment>
            <UserForm isSignUp={false} onSubmit={createNewUser} />
        </Fragment>
    )
}
export default Login;