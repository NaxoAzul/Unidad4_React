import { useEffect, useState } from "react";
import { Badge, Card, Container, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import { getMyClasses } from "../../services/coachService";

const days = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
};

function MyClassesPage() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadClasses = async () => {
        try {
            setLoading(true);

            const response = await getMyClasses();
            setClasses(response.data);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClasses();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Cargando clases...</p>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-success text-center">
                Mis Clases
            </h2>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Deporte</th>
                                <th>Objetivo</th>
                                <th>Duración</th>
                                <th>Sala</th>
                                <th>Observación</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {classes.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.sport?.name}</td>
                                    <td>{item.sport?.objective}</td>
                                    <td>{item.sport?.duration} min</td>
                                    <td>{item.room?.name}</td>
                                    <td>{item.observation}</td>
                                    <td>
                                        {item.status ? (
                                            <Badge bg="success">Activa</Badge>
                                        ) : (
                                            <Badge bg="secondary">Inactiva</Badge>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>                                                      
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MyClassesPage;