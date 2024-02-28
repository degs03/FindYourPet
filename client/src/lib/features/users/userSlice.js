import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: "",
        logged: false,
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    },
    reducers: {
        userLogin: state => {
            state.logged = true;
        },
        userLogout: state => {
            state.logged = false;
        },
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        clearUser: state => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.phone = "";
        },
        updatePhone: (state, action) => {
            state.phone = action.payload.phone;
        }
    }
})

export const { userLogin, userLogout, setUser, clearUser, updatePhone } = userSlice.actions


export const selectLogged = (state) => state.user.logged
export const selectRole = (state) => state.user.role
export const selectUser = (state) => state.user

export default userSlice.reducer