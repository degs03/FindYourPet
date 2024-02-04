"use client"
import React, { Fragment, useCallback, useState } from 'react';
import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import styles from './page.module.css';
import { db, storage } from '@/firebase/config';
import { addDoc, collection, serverTimestamp, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Button } from '@mui/material';

const Dropzone = () => {
    const [files, setFiles] = useState([]);
    const uploadPost = async () => {
        // Crea un nuevo documento en la colección "posts"
        const docRef = await addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp()
        });
        // Espera a que todas las imágenes se hayan subido antes de continuar
        await Promise.all(
            files.map(image => {
                // Crea una referencia a un lugar en Firebase Storage donde se subirá la imagen
                const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`);
                // Sube la imagen a Firebase Storage
                uploadBytes(imageRef, image, "data_url").then(async () => {
                    // Obtiene la URL de descarga una vez que la imagen se ha subido
                    const downloadURL = await getDownloadURL(imageRef);
                    // Actualiza el documento en Firebase Firestore para incluir la URL de descarga de la imagen
                    await updateDoc(doc(db, "posts", docRef.id), {
                        images: arrayUnion(downloadURL)
                    });
                });
            })
        );
        setFiles([]);
    };

    // Funcion que recibe los archivos aceptados y rechazados
    const onDrop = useCallback(acceptedFiles => {
        // Si hay archivos aceptados, se asignaran en el useState tomando los valores anteriores para agregarle los nuevos
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }
    }, [])

    // Se activa cuando el usuario suelta el archivo
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }
    })
    // getRootProps y getInputProps son dos funciones que retornan objetos con propiedades que se utilizan para crear el dropzone
    return (
        <Fragment>
            <div {...getRootProps({ // Todos los atributos se pasan por la funcion getRootProps para evitar sobreescribir sus atributos
                className: styles.dropzone
            })}>
                <input {...getInputProps()} />
                {isDragActive ? // Detecta si el usuario esta arrastrando un archivo
                    <p>Drop the files here ...</p>
                    :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            {/* Preview */}
            <ul>
                {files.map(file => (
                    <li key={file.name} style={{ listStyleType: 'none' }}>
                        <Image src={file.preview} alt='' width={100} height={100} />
                    </li>
                ))}
            </ul>
            <Button onClick={uploadPost}>Subir</Button>
        </Fragment>
    )
};

export default Dropzone;