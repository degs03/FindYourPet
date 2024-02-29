'use client'
import { usePostContext } from "@/app/context/PostContext";
import PostForm from "@/components/PostForm/page";
import { createPost } from "../../api/route";
import { Fragment } from "react";
import Swal from "sweetalert2";

const newPosts = () => {
    const { setDownloadURLs } = usePostContext();
    const newPost = async (data, onSuccess, onFail) => {
        try {
            const result = await createPost(data);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Publicación creada correctamente.",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
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
