import axios from 'axios';

const blogApi = axios.create ({
    baseURL: 'http://127.0.0.1:3000/blog-programador/v1',
    timeout: 5000,
    httpsAgent: false
})

export const getPublications = async () => {
    try {
        return await blogApi.get('/publications/all')
    }catch (error) {
        return {
            error: true,
            errors: error,
            message: 'Error al obtener las publicaciones'
        }
    }
}

export const recentPublications = async () => {
    try {
        return await blogApi.get('/publications/recent')
    }catch (error) {
        return {
            error: true,
            errors: error,
            message: 'Error al obtener las publicaciones'
        }
    }
}

export const oldPublications = async () => {
    try {
        return await blogApi.get('/publications/old')
    }catch (error) {
        return {
            error: true,
            errors: error,
            message: 'Error al obtener las publicaciones'
        }
    }
}

export const getPublicationsByCourse = async (name) => {
    try {
        return await blogApi.get(`/publications/course/${encodeURIComponent(name)}`)
    }catch (error) {
        return {
            error: true,
            errors: error,
            message: 'Error al obtener las publicaciones'
        }
    }
}

export const addComment = async (commentData) => {
    try {
        return await blogApi.post('/comments/add', commentData)
    }catch (error) {
        return {
            error: true,
            errors: error,
            message: 'Error al agregar el comentario'
        }
    }
}

export const getCommentsByPublication = async (postId) => {
    try {
        return await blogApi.get(`/comments/${postId}`)
    }catch (error) {
        return {
            error: true,
            errors: error,
            message: 'Error al obtener los comentarios'
        }
    }
}
