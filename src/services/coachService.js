const API_URL = "http://localhost:3000/api/coach";

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

function getErrorMessage(data, defaultMessage) {
    let errorMessage = data.message || defaultMessage;

    if (data.errors) {
        errorMessage += "\n\n";

        Object.values(data.errors).forEach(error => {
            errorMessage += `• ${error}\n`;
        });
    }

    return errorMessage;
}

export async function getMyClasses() {
    const response = await fetch(`${API_URL}/my-classes`, {
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener clases."));
    }

    return data;
}

export async function getMySchedules() {
    const response = await fetch(`${API_URL}/my-schedules`, {
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener horarios."));
    }

    return data;
}

export async function getMyRooms() {
    const response = await fetch(`${API_URL}/my-rooms`, {
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener salas."));
    }

    return data;
}