import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        group: '',
        taskTitle: '',
        taskDescription: '',
        solution: '',
        github: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8 space-y-4"
        >
            <input
                type="text"
                name="name"
                placeholder="ФИО"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                name="group"
                placeholder="Группа"
                value={formData.group}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                name="taskTitle"
                placeholder="Название задания"
                value={formData.taskTitle}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
                name="taskDescription"
                placeholder="Условие задания"
                value={formData.taskDescription}
                onChange={handleChange}
                rows="3"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
                name="solution"
                placeholder="Решение"
                value={formData.solution}
                onChange={handleChange}
                rows="6"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="url"
                name="github"
                placeholder="Ссылка на GitHub (https://github.com/...)"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                🚀 Отправить
            </button>
        </form>
    );
};

export default Form;
