"use client"
import React, { createContext, useContext, useState } from 'react';

// Crea un nuevo contexto llamado PostContext
const PostContext = createContext();

// Crea un proveedor de contexto que envuelve a los componentes hijos y proporciona el estado downloadURLs y la función setDownloadURLs
export const PostProvider = ({ children }) => {
    const [downloadURLs, setDownloadURLs] = useState([]);

    // Retorna el proveedor de contexto con el valor del estado y la función para actualizarlo
    return (
        <PostContext.Provider value={{ downloadURLs, setDownloadURLs }}>
            {children}
        </PostContext.Provider>
    );
};

// Crea un hook personalizado para acceder al contexto y obtener el estado y la función para actualizarlo
export const usePostContext = () => {
    return useContext(PostContext);
};
