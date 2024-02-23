import axios from "axios";


/* Session Routes */
export function login(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post("http://localhost:8000/api/session/login", data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
export function logout() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete("http://localhost:8000/api/session/logout", { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

/* User */
export function register(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/user/new`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function passwordForgot(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/forgotPassword", data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function passwordReset(data, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/user/resetPassword/${token}`, data);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function findUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/${id}`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

/* Posts */
export function findPost(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function findAllPosts() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/post/all`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function createPost(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post("http://localhost:8000/api/post/new", data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function editPost(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/post/${id}`, data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function deletePost(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/post/${id}`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}