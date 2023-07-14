// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Home from "./pages/Home";
import Register from "./pages/Register";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/register" element={ <Register/> } />
        </Routes>
    )
}