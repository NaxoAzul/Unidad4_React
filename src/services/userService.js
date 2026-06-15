const API_URL = "http://localhost:3000/api/users";

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

export async function getUsers() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Error al obtener usuarios");
    }

    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al crear usuario")
        );
    }

    return data;
}

export async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al actualizar usuario")
        );
    }

    return data;
}

export async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            getErrorMessage(data, "Error al eliminar usuario")
        );
    }

    return true;
}