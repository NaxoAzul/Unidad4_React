import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const initialForm = {
    sport_id: "",
    room_id: "",
    coach_id: "",
    observation: "",
    status: true,
};

function AssignmentFormModal({
    show,
    handleClose,
    handleSave,
    selectedAssignment,
    sports,
    rooms,
    coaches,
}) {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (selectedAssignment) {
            setFormData({
                sport_id: selectedAssignment.sport_id,
                room_id: selectedAssignment.room_id,
                coach_id: selectedAssignment.coach_id,
                observation: selectedAssignment.observation || "",
                status: selectedAssignment.status,
            });
        } else {
            setFormData(initialForm);
        }
    }, [selectedAssignment, show]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        handleSave({
            ...formData,
            sport_id: Number(formData.sport_id),
            room_id: Number(formData.room_id),
            coach_id: Number(formData.coach_id),
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedAssignment
                        ? "Editar Asignación"
                        : "Nueva Asignación"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label>Deporte</Form.Label>
                        <Form.Select
                            name="sport_id"
                            value={formData.sport_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>

                            {sports.map((sport) => (
                                <option
                                    key={sport.id}
                                    value={sport.id}
                                >
                                    {sport.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Sala</Form.Label>

                        <Form.Select
                            name="room_id"
                            value={formData.room_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>

                            {rooms.map((room) => (
                                <option
                                    key={room.id}
                                    value={room.id}
                                >
                                    {room.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Coach</Form.Label>

                        <Form.Select
                            name="coach_id"
                            value={formData.coach_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>

                            {coaches.map((coach) => (
                                <option
                                    key={coach.id}
                                    value={coach.id}
                                >
                                    {coach.full_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Observación</Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="observation"
                            value={formData.observation}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        name="status"
                        label="Asignación activa"
                        checked={formData.status}
                        onChange={handleChange}
                    />

                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AssignmentFormModal;