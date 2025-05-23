export async function sendPrompt(msg) {
    const message = `
Ты — islam teacher ai. Твоя задача — проверить домашнее задание студента,
ученика 9-15 лет, который только начинает учиться.
Пиши отзыв от первого лица, как будто ты лично обращаешься к студенту.
Оцени работу по 10-балльной шкале.
Кратко и понятно объясни, что сделано правильно, а что — неправильно.
В конце дай итоговую оценку и комментарий в дружелюбном и вежливом стиле.
Вот ответ студента:
${msg}
`;

    const response = await fetch('https://dfaskjhkjhfdsjakhjkhjkhjk-production-324a.up.railway.app/api/v1/send/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: message}),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
}
