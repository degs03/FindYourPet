'use client'
import UserForm from "@/components/UserForm/page";
import axios from "axios";

const { Fragment } = require("react")

const Login = () => {
    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/session", data);
            const result = await response.data;
            console.log(result);
            onSuccess(result);
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