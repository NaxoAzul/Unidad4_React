const API_URL = "http://localhost:3000/api/rooms";

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

export async function getRooms() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al obtener salas")
        );
    }

    return data;
}

export async function createRoom(roomData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(roomData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al crear sala")
        );
    }

    return data;
}

export async function updateRoom(id, roomData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(roomData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al actualizar sala")
        );
    }

    return data;
}

export async function deleteRoom(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al eliminar sala")
        );
    }

    return data;
}