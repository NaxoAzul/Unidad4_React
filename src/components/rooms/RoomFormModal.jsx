import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const initialForm = {
    name: "",
    description: "",
    capacity: "",
    location: "",
    observation: "",
    image_url: "",
    status: true,
};

function RoomFormModal({
    show,
    handleClose,
    handleSave,
    selectedRoom,
}) {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (selectedRoom) {
            setFormData({
                name: selectedRoom.name || "",
                description: selectedRoom.description || "",
                capacity: selectedRoom.capacity || "",
                location: selectedRoom.location || "",
                observation: selectedRoom.observation || "",
                image_url: selectedRoom.image_url || "",
                status: selectedRoom.status ?? true,
            });
        } else {
            setFormData(initialForm);
        }
    }, [selectedRoom, show]);

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
            ...formData,
            capacity: Number(formData.capacity),
            image_url: formData.image_url || null,
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedRoom ? "Editar Sala" : "Nueva Sala"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control
                            type="number"
                            name="capacity"
                            min="1"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
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

                    <Form.Group className="mb-3">
                        <Form.Label>URL de imagen</Form.Label>
                        <Form.Control
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        name="status"
                        label="Sala activa"
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

export default RoomFormModal;