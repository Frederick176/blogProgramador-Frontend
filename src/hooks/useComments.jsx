import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { addComment, getCommentsByPublication } from '../services/api';

export const useComments = (postId) => {
    const [ comments, setComments ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const commentsFetch = async () => {
        setLoading(true);
        const response = await getCommentsByPublication(postId);
        if(!response.error) setComments(response.data.comments || []);
        setLoading(false)

    }

    const commentsSubmit = async ({ name, content }) => {
        if(!name.trim() || !content.trim()) {
            toast.error('Por favor completa todos los campos');
            return false
        }

        const response = await addComment({ name, content, postId });
        if(!response.error) {
            toast.success('Comentario agregado');
            setComments([]);
            return true
        }else {
            toast.error('Error al agregar el comentario');
            return false
        }
    }

    useEffect(() => {
        commentsFetch();
    }, /*[postId]*/);

    return {
        comments,
        loading,
        commentsFetch,
        commentsSubmit
    }
}