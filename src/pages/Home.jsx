import React from "react";
import { Navbar } from "../components/Navbar.jsx";
import { PublicationsList } from "../components/PublicationsList.jsx";

export const Home = () => {
    return (
        <main className="bg-gray-100 min-h-screen">
            <Navbar/>
            <PublicationsList/>   
        </main>
    )
}