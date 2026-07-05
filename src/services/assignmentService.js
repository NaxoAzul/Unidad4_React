const API_URL = "http://localhost:3000/api/sport-rooms";

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
    };
}

function getErrorMessage(data, defaultMessage) {
    let errorMessage = data.message || defaultMessage;

    if (data.errors) {
        errorMessage += "\n\n";
        Object.values(data.errors).forEach((error) => {
            errorMessage += `• ${error}\n`;
        });
    }

    return errorMessage;
}

export async function getAssignments() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener asignaciones"));
    }

    return data;
}

export async function createAssignment(assignmentData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(assignmentData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al crear asignación"));
    }

    return data;
}

export async function updateAssignment(id, assignmentData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(assignmentData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al actualizar asignación"));
    }

    return data;
}

export async function deleteAssignment(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al eliminar asignación"));
    }

    return data;
}