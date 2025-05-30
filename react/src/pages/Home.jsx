import React, { useState } from 'react';
import { sendPrompt } from '../services/aiService';
import { sendTelegramMessage } from '../services/telegramService';
import Form from '../components/Form';

export default function Home() {
    const [aiResponse, setAiResponse] = useState('');
    const [telegramStatus, setTelegramStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        setAiResponse('');
        setTelegramStatus('');

        const prompt = `
ФИО: ${formData.name}
Название задания: ${formData.taskTitle}
Условие задания: ${formData.taskDescription}
Решение: ${formData.solution}
        `;

        try {
            const responseFromAI = await sendPrompt(prompt);
            setAiResponse(responseFromAI);

            const telegramMessage = `
📚 Новое домашнее задание
_______________

👤 ФИО: ${formData.name}
👥 Группа: ${formData.group}
_______________

📌 Название задания: ${formData.taskTitle}
_______________

📝 Условие:
${formData.taskDescription}
_______________

✅ Решение ${formData.name}:
${formData.solution}
_______________

🔗 GitHub: ${formData.github || 'Нет ссылки'}
_______________

🧑‍🏫 Комментарий от islamTeacher_ai_checker:
${responseFromAI}
`;

            const telegramResult = await sendTelegramMessage(telegramMessage);
            setTelegramStatus(
                telegramResult
                    ? '✅ Отправлено к учителю'
                    : '❌ Ошибка отправки в Telegram'
            );
        } catch (error) {
            console.error(error);
            setTelegramStatus('❌ Ошибка при отправке');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="card">
                <h1>📘 Islam AI Checker</h1>
                <p>Умная проверка домашних заданий + Telegram</p>
            </div>

            <Form onSubmit={handleFormSubmit} />

            {loading && <p className="card">⏳ Загрузка...</p>}

            {aiResponse && (
                <div className="card">
                    <h3>🤖 Комментарий от Islam Teacher ai chacker:</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>{aiResponse}</p>
                </div>
            )}

            {telegramStatus && (
                <div className={telegramStatus.startsWith('✅') ? 'status-success' : 'status-error'}>
                    {telegramStatus}
                </div>
            )}

            <div className="card">
                <p>Связь , GitHub  <a style={{color: "black"}} href='https://github.com/Islam0122'>Islam0122</a> ,  Telegram : <a style={{color: "black"}} href="https://t.me/duishobaevislam01https://t.me/duishobaevislam01https://t.me/duishobaevislam01">duishobaevislam01</a>  Instagram:  <a style={{color: "black"}} href="https://www.instagram.com/duishobaevislam01">duishobaevislam01</a></p>
            </div>
        </>
    );
}