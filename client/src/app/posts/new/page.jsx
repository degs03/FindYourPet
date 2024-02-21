'use client'
import { usePostContext } from "@/app/context/PostContext";
import PostForm from "@/components/PostForm/page";
import axios from "axios";
const { Fragment  } = require("react");
const newPosts = () => {
    const { setDownloadURLs } = usePostContext();
    const newPost = async (data, onSuccess, onFail) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/post/new`, data);
            const result = await response.data;
            onSuccess(result);
            setDownloadURLs([]);
        } catch (error) {
            onFail(error);
            console.log({error:error});
        }
    }
    return (
        <Fragment>
            <PostForm onSubmit={newPost} />
        </Fragment >
    )
}
export default newPosts;
