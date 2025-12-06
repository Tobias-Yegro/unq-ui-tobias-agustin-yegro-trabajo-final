import { API_BASE_URL } from "../constants/api";

export async function fetchDifficulties() {
    const response = await fetch(`${API_BASE_URL}/api/difficulty`);
    if (!response.ok) {
        throw new Error('Error al obtener dificultades');
    }
    return await response.json();
}

export async function fetchQuestions(difficulty) {
    const response = await fetch(`${API_BASE_URL}/api/questions?difficulty=${difficulty}`);
    if (!response.ok) {
        throw new Error('Error al obtener preguntas');
    }

    const data = await response.json();

    return data.map((q) => ({
        id: q.id,
        text: q.question,
        options: [
            { key: "option1", text: q.option1 },
            { key: "option2", text: q.option2 },
            { key: "option3", text: q.option3 },
            { key: "option4", text: q.option4 }
        ]
    }));

}

export async function postAnswer({ questionId, option }) {
    const response = await fetch(`${API_BASE_URL}/api/answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, option }),
    });

    if (!response.ok) {
        throw new Error('Error al enviar la respuesta');
    }
    return response.json();
}