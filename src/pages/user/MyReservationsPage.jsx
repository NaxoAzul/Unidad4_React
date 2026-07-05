import { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import {
    cancelReservation,
    getMyReservations,
} from "../../services/reservationService";

const days = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
};

function MyReservationsPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadReservations = async () => {
        try {
            setLoading(true);
            const response = await getMyReservations();
            setReservations(response.data);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const handleCancel = async (reservation) => {
        const result = await Swal.fire({
            title: "¿Cancelar reserva?",
            text: "Esta acción cambiará el estado de la reserva.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "Volver",
            confirmButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            await cancelReservation(reservation.id);

            Swal.fire(
                "Reserva cancelada",
                "La reserva fue cancelada correctamente.",
                "success"
            );

            loadReservations();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Cargando reservas...</p>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-primary text-center">
                Mis Reservas
            </h2>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Clase</th>
                                <th>Sala</th>
                                <th>Coach</th>
                                <th>Día</th>
                                <th>Horario</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservations.map((reservation) => {
                                const schedule = reservation.classSchedule;
                                const assignment = schedule?.sportRoom;

                                return (
                                    <tr key={reservation.id}>
                                        <td>{reservation.id}</td>
                                        <td>{assignment?.sport?.name}</td>
                                        <td>{assignment?.room?.name}</td>
                                        <td>
                                            {assignment?.coach?.full_name ||
                                                assignment?.coach?.email}
                                        </td>
                                        <td>{days[schedule?.day_of_week]}</td>
                                        <td>
                                            {schedule?.start_time} -{" "}
                                            {schedule?.end_time}
                                        </td>
                                        <td>
                                            {reservation.status === "cancelled" ? (
                                                <Badge bg="secondary">
                                                    Cancelada
                                                </Badge>
                                            ) : (
                                                <Badge bg="success">
                                                    Activa
                                                </Badge>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                disabled={
                                                    reservation.status ===
                                                    "cancelled"
                                                }
                                                onClick={() =>
                                                    handleCancel(reservation)
                                                }
                                            >
                                                Cancelar
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MyReservationsPage;