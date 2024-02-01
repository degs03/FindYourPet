"use client"
import React, { Fragment, useCallback, useState } from 'react';
import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import styles from './page.module.css';

const Dropzone = () => {
    const [files, setFiles] = useState([]);
    // Funcion que recibe los archivos aceptados y rechazados
    const onDrop = useCallback(acceptedFiles => {
        // Si hay archivos aceptados, se asignaran en el useState tomando los valores anteriores para agregarle los nuevos
        if(acceptedFiles?.length){
        setFiles(previousFiles => [
            ...previousFiles,
            ...acceptedFiles.map(file =>
                Object.assign(file, {preview: URL.createObjectURL(file)}))
        ])
    }
    }, [])

    // Se activa cuando el usuario suelta el archivo
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: {'image/*':[]}
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
                <li key={file.name} style={{listStyleType:'none'}}>
                    <Image src={file.preview} alt='' width={100} height={100} />
                </li>
            ))}
        </ul>
        </Fragment>
    )
};

export default Dropzone;