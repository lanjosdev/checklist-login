// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

// Components:
import PrivateRouter from "./components/PrivateRouter";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/register" element={ <Register/> } />

            <Route path="/admin" element={ <PrivateRouter> <Admin/> </PrivateRouter> } />
        </Routes>
    )
}