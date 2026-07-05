import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getUser, logout } from "../services/authService";

function AdminLayout() {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <div className="container">
                    <Link
                        className="navbar-brand"
                        to="/admin/dashboard"
                    >
                        SportClub Admin
                    </Link>

                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" to="/admin/profile">
                            Mi Perfil
                        </Link>

                        <Link
                            className="nav-link"
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            className="nav-link"
                            to="/admin/sports"
                        >
                            Deportes
                        </Link>
                        
                        <Link
                            className="nav-link"
                            to="/admin/rooms"
                        >
                            Salas
                        </Link>
                        
                        <Link
                            className="nav-link"
                            to="/admin/assignments"
                        >
                            Asignaciones
                        </Link>
                        
                        <Link
                            className="nav-link"
                            to="/admin/schedules"
                        >
                            Horarios
                        </Link>
                        
                        <Link
                            className="nav-link"
                            to="/admin/users"
>
                            Usuarios
                        </Link>
                    </div>

                    <span className="text-white me-3">
                        {user?.full_name}
                    </span>

                    <Button
                        variant="outline-light"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;