'use client'
import { usePostContext } from "@/app/context/PostContext";
import PostForm from "@/components/PostForm/page";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { editPost, findPost } from "@/app/api/route";
import Swal from "sweetalert2";

const editPosts = () => {
    const { setDownloadURLs } = usePostContext();
    const { id } = useParams();
    const [preset, setPreset] = useState({});

    useEffect(() => {
        getPost();
    }, [])


    const getPost = async () => {
        try {
            const result = await findPost(id);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Publicación editada correctamente.",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            setPreset(result);
            console.log(result);
        } catch (error) {
            onFail(error);
            console.log({ error: error });
        }
    }

    const editPosts = async (data, onSuccess, onFail) => {
        try {
            const result = await editPost(id, data);
            onSuccess(result);
            setDownloadURLs([]);
        } catch (error) {
            onFail(error);
            console.log({ error: error });
        }
    }
    return (
        <Fragment>
            <PostForm onSubmit={editPosts} preset={preset} />
        </Fragment >
    )
}

export default editPosts;