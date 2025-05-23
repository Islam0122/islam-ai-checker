import axios from 'axios';

const BOT_TOKEN = '7503400106:AAGmCcOA9RhFc7ZP2iXsd5g-nB5V8MRo1wg';
const CHAT_ID = '-4711259895';

export const sendTelegramMessage = async (text) => {
    try {
        const { data } = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text,
        });

        if (!data.ok) {
            throw new Error(`Ошибка Telegram API: ${data.description}`);
        }

        return data;
    } catch (error) {
        console.error('Ошибка отправки сообщения в Telegram:', error.message);
        return null;
    }
};
