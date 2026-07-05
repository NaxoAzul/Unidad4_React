const API_URL = `${import.meta.env.VITE_API_URL}/class-schedules`;

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

export async function getSchedules() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al obtener horarios"));
    }

    return data;
}

export async function createSchedule(scheduleData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(scheduleData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al crear horario"));
    }

    return data;
}

export async function updateSchedule(id, scheduleData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(scheduleData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al actualizar horario"));
    }

    return data;
}

export async function deleteSchedule(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(getErrorMessage(data, "Error al eliminar horario"));
    }

    return data;
}