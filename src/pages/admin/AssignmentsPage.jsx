import { useEffect, useState } from "react";
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";

import AssignmentFormModal from "../../components/assignments/AssignmentFormModal";

import {
    createAssignment,
    deleteAssignment,
    getAssignments,
    updateAssignment,
} from "../../services/assignmentService";

import { getSports } from "../../services/sportService";
import { getRooms } from "../../services/roomService";
import { getUsers } from "../../services/userService";

function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);
    const [sports, setSports] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [coaches, setCoaches] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const loadAssignments = async () => {
        try {
            setLoading(true);

            const assignmentsResponse = await getAssignments();
            const sportsResponse = await getSports();
            const roomsResponse = await getRooms();
            const usersResponse = await getUsers();

            setAssignments(assignmentsResponse.data);
            setSports(sportsResponse.data);
            setRooms(roomsResponse.data);

            const onlyCoaches = usersResponse.data.filter(
                (user) => user.role === "coach"
            );

            setCoaches(onlyCoaches);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAssignments();
    }, []);

    const openCreateModal = () => {
        setSelectedAssignment(null);
        setShowModal(true);
    };

    const openEditModal = (assignment) => {
        setSelectedAssignment(assignment);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAssignment(null);
    };

    const handleSave = async (formData) => {
        try {
            if (selectedAssignment) {
                await updateAssignment(selectedAssignment.id, formData);
                Swal.fire("Actualizado", "Asignación actualizada correctamente", "success");
            } else {
                await createAssignment(formData);
                Swal.fire("Creado", "Asignación creada correctamente", "success");
            }

            closeModal();
            loadAssignments();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleDelete = async (assignment) => {
        const result = await Swal.fire({
            title: "¿Eliminar asignación?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
        });

        if (result.isConfirmed) {
            try {
                await deleteAssignment(assignment.id);
                Swal.fire("Eliminado", "Asignación eliminada correctamente", "success");
                loadAssignments();
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Gestión de Asignaciones</h4>

                <div>
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={loadAssignments}
                    >
                        Refrescar
                    </Button>

                    <Button
                        variant="danger"
                        onClick={openCreateModal}
                    >
                        Nueva Asignación
                    </Button>
                </div>
            </Card.Header>

            <Card.Body>
                {loading ? (
                    <div className="text-center p-4">
                        <Spinner animation="border" />
                        <p className="mt-2">Cargando asignaciones...</p>
                    </div>
                ) : (
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Deporte</th>
                                <th>Sala</th>
                                <th>Coach</th>
                                <th>Observación</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {assignments.map((assignment) => (
                                <tr key={assignment.id}>
                                    <td>{assignment.id}</td>
                                    <td>{assignment.sport?.name}</td>
                                    <td>{assignment.room?.name}</td>
                                    <td>{assignment.coach?.full_name}</td>
                                    <td>{assignment.observation}</td>
                                    <td>
                                        {assignment.status ? (
                                            <Badge bg="success">Activa</Badge>
                                        ) : (
                                            <Badge bg="secondary">Inactiva</Badge>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => openEditModal(assignment)}
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(assignment)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>

            <AssignmentFormModal
                show={showModal}
                handleClose={closeModal}
                handleSave={handleSave}
                selectedAssignment={selectedAssignment}
                sports={sports}
                rooms={rooms}
                coaches={coaches}
            />
        </Card>
    );
}

export default AssignmentsPage;