import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getUser, logout } from "../services/authService";

function UserLayout() {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/user/dashboard">
                        SportClub Usuario
                    </Link>

                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" to="/user/profile">
                            Mi Perfil
                        </Link>

                        <Link className="nav-link" to="/user/classes">
                            Clases Disponibles
                        </Link>
                        
                        <Link className="nav-link" to="/user/reservations">
                            Mis Reservas
                        </Link>

                        <Link className="nav-link" to="/user/dashboard">
                            Dashboard
                        </Link>
                    </div>

                    <span className="text-white me-3">
                        {user?.full_name}
                    </span>

                    <Button variant="outline-light" onClick={handleLogout}>
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

export default UserLayout;