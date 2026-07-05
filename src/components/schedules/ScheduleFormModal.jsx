import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const initialForm = {
    sport_room_id: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
    status: true,
};

const days = [
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sábado" },
    { value: 7, label: "Domingo" },
];

function ScheduleFormModal({
    show,
    handleClose,
    handleSave,
    selectedSchedule,
    assignments,
}) {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (selectedSchedule) {
            setFormData({
                sport_room_id: selectedSchedule.sport_room_id || "",
                day_of_week: selectedSchedule.day_of_week || "",
                start_time: selectedSchedule.start_time?.slice(0, 5) || "",
                end_time: selectedSchedule.end_time?.slice(0, 5) || "",
                status: selectedSchedule.status ?? true,
            });
        } else {
            setFormData(initialForm);
        }
    }, [selectedSchedule, show]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        handleSave({
            sport_room_id: Number(formData.sport_room_id),
            day_of_week: Number(formData.day_of_week),
            start_time: formData.start_time,
            end_time: formData.end_time,
            status: formData.status,
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedSchedule ? "Editar Horario" : "Nuevo Horario"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Asignación</Form.Label>
                        <Form.Select
                            name="sport_room_id"
                            value={formData.sport_room_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>

                            {assignments.map((assignment) => (
                                <option key={assignment.id} value={assignment.id}>
                                    {assignment.sport?.name} - {assignment.room?.name} - {assignment.coach?.full_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Día</Form.Label>
                        <Form.Select
                            name="day_of_week"
                            value={formData.day_of_week}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>

                            {days.map((day) => (
                                <option key={day.value} value={day.value}>
                                    {day.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hora inicio</Form.Label>
                        <Form.Control
                            type="time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hora término</Form.Label>
                        <Form.Control
                            type="time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        name="status"
                        label="Horario activo"
                        checked={formData.status}
                        onChange={handleChange}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ScheduleFormModal;