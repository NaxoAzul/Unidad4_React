import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

import { getAvailableClasses } from "../../services/memberService";
import { createReservation } from "../../services/reservationService";

const days = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
};

function AvailableClassesPage() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadClasses = async () => {
        try {
            setLoading(true);

            const response = await getAvailableClasses();
            setClasses(response.data);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleReservation = async (scheduleId) => {
        try {
            await createReservation(scheduleId);

            Swal.fire(
                "Reserva creada",
                "La clase fue reservada correctamente.",
                "success"
            );
        } catch (error) {
            Swal.fire("Error", error.message, "error");
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
            <h2 className="mb-4 text-primary text-center">
                Clases Disponibles
            </h2>

            <Row>
                {classes.map((item) =>
                    item.schedules.map((schedule) => (
                        <Col
                            md={6}
                            lg={4}
                            key={schedule.id}
                            className="mb-4"
                        >
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>
                                        {item.sport?.name}
                                    </Card.Title>
            
                                    <Card.Text>
                                        <strong>Objetivo:</strong>{" "}
                                        {item.sport?.objective}
                                    </Card.Text>
            
                                    <Card.Text>
                                        <strong>Sala:</strong>{" "}
                                        {item.room?.name}
                                    </Card.Text>
            
                                    <Card.Text>
                                        <strong>Coach:</strong>{" "}
                                        {item.coach?.full_name || item.coach?.email}
                                    </Card.Text>

                                    <Card.Text>
                                            <strong>Día:</strong>{" "}
                                            {days[schedule.day_of_week]}
                                    </Card.Text>
            
                                    <Card.Text>
                                        <strong>Horario:</strong>{" "}
                                        {schedule.start_time} - {schedule.end_time}
                                    </Card.Text>
            
                                    <Button 
                                        variant="primary"
                                        onClick={() => handleReservation(schedule.id)}
                                    >
                                        Reservar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default AvailableClassesPage;