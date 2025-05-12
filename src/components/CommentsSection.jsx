import React, { useState } from "react";
import { useComments } from "../hooks/useComments.jsx";

export const CommentsSection = ({ postId }) => {
    const { comments, loading, commentsSubmit } = useComments(postId);
    const [showForm, setShowForm] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await commentsSubmit({ name, content });
        if (ok) {
            setName("");
            setContent("");
            setShowForm(false);
            setShowComments(true);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => setShowForm((v) => !v)}
                    title="Agregar un nuevo comentario"
                >
                    +
                </button>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    onClick={() => setShowComments((v) => !v)}
                >
                    {showComments ? "Ocultar comentarios" : "Ver comentarios"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                        className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Comentario"
                        className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Enviar
                    </button>
                </form>
            )}

            {showComments && (
                <div className="mt-4">
                    {loading ? (
                        <div className="text-gray-500 italic">Cargando comentarios...</div>
                    ) : comments.length === 0 ? (
                        <div className="text-gray-500 italic">Sin comentarios</div>
                    ) : (
                        <ul className="space-y-4">
                            {comments.map((c) => (
                                <li key={c._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <span className="font-bold text-blue-600">{c.name}:</span>
                                    <br />
                                    <span className="text-gray-700">{c.content}</span>
                                    <div className="text-sm text-gray-500 mt-2">
                                        {new Date(c.date).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};