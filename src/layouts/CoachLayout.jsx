import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getUser, logout } from "../services/authService";

function CoachLayout() {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container">
                    <Link className="navbar-brand" to="/coach/dashboard">
                        SportClub Coach
                    </Link>

                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" to="/coach/profile">
                            Mi Perfil
                        </Link>

                        <Link className="nav-link" to="/coach/my-classes">
                            Mis Clases
                        </Link>

                        <Link className="nav-link" to="/coach/my-schedules">
                            Mi Horario
                        </Link>

                        <Link className="nav-link" to="/coach/dashboard">
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

export default CoachLayout;