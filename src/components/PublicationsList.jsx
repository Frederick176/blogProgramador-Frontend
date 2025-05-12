import React, { useState } from "react";
import { usePublications } from "../hooks/usePublications";
import { CommentsSection } from "./CommentsSection";

export const PublicationsList = () => {
    const { publications, loading, error, fetchRecent, fetchAll, fetchOld, fetchByCourse } = usePublications();
    const [course, setCourse] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (course.trim() !== "") {
            fetchByCourse(course);
        }
    };

    if (loading) return <div className="text-gray-500 italic">Cargando...</div>;
    if (error) return <div className="text-red-500 italic">{error}</div>;

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={handleSearch} className="mb-6 flex items-center gap-4">
                <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="Buscar por curso..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Buscar
                </button>
            </form>
            <div className="flex justify-between mb-6">
                <button
                    onClick={fetchAll}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    Todas las publicaciones
                </button>
                <button
                    onClick={fetchRecent}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Publicaciones recientes
                </button>
                <button
                    onClick={fetchOld}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                    Publicaciones antiguas
                </button>
            </div>
            <div className="space-y-6">
                {publications.map((pub) => (
                    <div
                        key={pub._id}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-2">{pub.title}</h3>
                        <p className="text-gray-700 mb-4">{pub.description}</p>
                        <p className="text-sm text-gray-500 mb-4">
                            <span className="font-semibold">Curso:</span> {pub.course?.name || "Sin curso"}
                        </p>
                        <CommentsSection postId={pub._id} />
                    </div>
                ))}
            </div>
        </div>
    );
};