'use client'
import UserForm from "@/components/UserForm/page";
import axios from "axios";

const { Fragment } = require("react")

const Register = () => {
    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/new", data);
            const result = await response.data;
            console.log(result);
            onSuccess(result);
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