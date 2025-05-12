import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { getPublications, recentPublications, oldPublications, getPublicationsByCourse } from "../services/api.jsx"

export const usePublications = () => {
    const [publications, setPublications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchAll = async () => {
        setLoading(true)
        const res = await getPublications()
        if (res.error) {
            setError("Error al cargar publicaciones")
            toast.error("Error al cargar publicaciones")
        } else {
            setPublications(res.data.publications)
            toast.success("Publicaciones cargadas correctamente")
            setError(null)
        }
        setLoading(false)
    }

    const fetchRecent = async () => {
        setLoading(true)
        const res = await recentPublications()
        if (res.error) {
            setError("Error al cargar publicaciones recientes")
            toast.error("Error al cargar publicaciones recientes")
        } else {
            setPublications(res.data.publications)
            toast.success("Publicaciones recientes cargadas")
            setError(null)
        }
        setLoading(false)
    }

    const fetchOld = async () => {
        setLoading(true)
        const res = await oldPublications()
        if (res.error) {
            setError("Error al cargar publicaciones antiguas")
            toast.error("Error al cargar publicaciones antiguas")
        } else {
            setPublications(res.data.publications)
            toast.success("Publicaciones antiguas cargadas")
            setError(null)
        }
        setLoading(false)
    }

    const fetchByCourse = async (name) => {
        setLoading(true)
        const res = await getPublicationsByCourse(name)
        if (res.error) {
            setError("Error al buscar publicaciones por curso")
            toast.error("Error al buscar publicaciones por curso")
        } else {
            setPublications(res.data.publications)
            toast.success("Publicaciones filtradas por curso")
            setError(null)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAll()
    }, [])

    return { 
        fetchRecent, 
        fetchAll, 
        fetchOld, 
        fetchByCourse,
        publications, 
        loading, 
        error 
    }
}