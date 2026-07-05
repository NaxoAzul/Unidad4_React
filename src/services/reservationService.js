const API_URL = "http://localhost:3000/api/reservations";

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

export async function createReservation(classScheduleId) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            class_schedule_id: classScheduleId,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al crear reserva")
        );
    }

    return data;
}

export async function getMyReservations() {
    const response = await fetch(`${API_URL}/my-reservations`, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al obtener reservas")
        );
    }

    return data;
}

export async function cancelReservation(id) {
    const response = await fetch(`${API_URL}/${id}/cancel`, {
        method: "PATCH",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al cancelar reserva")
        );
    }

    return data;
}