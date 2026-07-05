const API_URL = `${import.meta.env.VITE_API_URL}/sports`;

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

export async function getSports() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener deportes"));
    }

    return data;
}

export async function createSport(sportData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(sportData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al crear deporte"));
    }

    return data;
}

export async function updateSport(id, sportData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(sportData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al actualizar deporte"));
    }

    return data;
}

export async function deleteSport(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al eliminar deporte"));
    }

    return data;
}

export async function updateSportStatus(id, status) {
    const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al cambiar estado"));
    }

    return data;
}