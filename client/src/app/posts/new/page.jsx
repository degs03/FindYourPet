'use client'
import { usePostContext } from "@/app/context/PostContext";
import PostForm from "@/components/PostForm/page";
import { createPost } from "../../api/route";
const { Fragment  } = require("react");
const newPosts = () => {
    const { setDownloadURLs } = usePostContext();
    const newPost = async (data, onSuccess, onFail) => {
        try {
            const result = await createPost(data);
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
