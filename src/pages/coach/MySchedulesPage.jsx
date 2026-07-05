import { useEffect, useState } from "react";
import { Badge, Card, Container, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import { getMySchedules } from "../../services/coachService";

const days = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
};

function MySchedulesPage() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadSchedules = async () => {
        try {
            setLoading(true);

            const response = await getMySchedules();
            setSchedules(response.data);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Cargando horarios...</p>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center text-success mb-4">
                Mi Horario
            </h2>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Deporte</th>
                                <th>Sala</th>
                                <th>Día</th>
                                <th>Horario</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {schedules.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td>{schedule.sportRoom?.sport?.name}</td>

                                    <td>{schedule.sportRoom?.room?.name}</td>

                                    <td>{days[schedule.day_of_week]}</td>

                                    <td>
                                        {schedule.start_time} - {schedule.end_time}
                                    </td>

                                    <td>
                                        {schedule.status ? (
                                            <Badge bg="success">
                                                Activo
                                            </Badge>
                                        ) : (
                                            <Badge bg="secondary">
                                                Inactivo
                                            </Badge>
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

export default MySchedulesPage;