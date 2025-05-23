import React, { useState } from 'react';
import { sendPrompt } from '../services/aiService';
import { sendTelegramMessage } from '../services/telegramService';
import Form from "../components/Form.jsx";

import { FiUpload, FiCheckCircle, FiAlertCircle, FiMessageCircle } from 'react-icons/fi';

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
            // 1. Получаем ответ от AI
            const responseFromAI = await sendPrompt(prompt);
            setAiResponse(responseFromAI);

            // 2. Сообщение для Telegram (включая ответ от AI)
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

🧑‍🏫 Комментарий от islamteacher_ai_checker:
${responseFromAI}
`;

            // 3. Отправляем в Telegram
            const telegramResult = await sendTelegramMessage(telegramMessage);
            setTelegramStatus(telegramResult ? '✅ Отправлено в Telegram' : '❌ Ошибка отправки в Telegram');
        } catch (error) {
            console.error(error);
            setTelegramStatus('❌ Ошибка при отправке');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Заголовок с иконкой */}
            <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-3 mb-8">
                <FiUpload className="text-blue-600" size={36} /> Отправка домашнего задания
            </h2>

            {/* Форма */}
            <Form onSubmit={handleFormSubmit} />

            {/* Загрузка */}
            {loading && (
                <p className="text-center mt-6 text-gray-600 italic flex items-center justify-center gap-2">
                    <FiMessageCircle size={20} /> Загрузка...
                </p>
            )}

            {/* Ответ AI */}
            {aiResponse && (
                <div className="max-w-xl mx-auto mt-8 p-6 bg-green-100 rounded-lg shadow-md border border-green-300">
                    <h3 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                        <FiCheckCircle size={24} /> Ответ Islam-Teacher-Ai-checker:
                    </h3>
                    <p className="whitespace-pre-line">{typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse)}</p>
                </div>
            )}

            {/* Статус Telegram */}
            {telegramStatus && (
                <div
                    className={`max-w-xl mx-auto mt-6 p-4 rounded-lg shadow-md border
                    ${telegramStatus.startsWith('✅') ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}
                >
                    <p className="flex items-center gap-2">
                        {telegramStatus.startsWith('✅') ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
                        {telegramStatus}
                    </p>
                </div>
            )}
        </div>
    );
}
