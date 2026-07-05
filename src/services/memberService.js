const API_URL = "http://localhost:3000/api/member";

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

export async function getAvailableClasses() {
    const response = await fetch(`${API_URL}/classes`, {
        method: "GET",
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener clases."));
    }

    return data;
}

export async function getClassById(id) {
    const response = await fetch(`${API_URL}/classes/${id}`, {
        method: "GET",
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener clase."));
    }

    return data;
}

export async function getSports() {
    const response = await fetch(`${API_URL}/sports`, {
        method: "GET",
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener deportes."));
    }

    return data;
}

export async function getRooms() {
    const response = await fetch(`${API_URL}/rooms`, {
        method: "GET",
        headers: getHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener salas."));
    }

    return data;
}