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
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h2>Отправка домашнего задания</h2>
            <input
                type="text"
                name="name"
                placeholder="ФИО"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="group"
                placeholder="Группа"
                value={formData.group}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="taskTitle"
                placeholder="Название задания"
                value={formData.taskTitle}
                onChange={handleChange}
                required
            />
            <textarea
                name="taskDescription"
                placeholder="Условие задания"
                value={formData.taskDescription}
                onChange={handleChange}
                required
                rows="3"
            />
            <textarea
                name="solution"
                placeholder="Решение"
                value={formData.solution}
                onChange={handleChange}
                required
                rows="6"
            />
            <input
                type="url"
                name="github"
                placeholder="Ссылка на GitHub (опционально)"
                value={formData.github}
                onChange={handleChange}
            />
            <button type="submit">🚀 Отправить</button>
        </form>
    );
};

export default Form;