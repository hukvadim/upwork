require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const UPWORK_API_URL = "https://www.upwork.com/api/profiles/v3/search/jobs";

app.get("/jobs", async (req, res) => {
    try {
        const response = await axios.get(UPWORK_API_URL, {
            headers: {
                Authorization: `Bearer ${process.env.UPWORK_ACCESS_TOKEN}`
            },
            params: {
                q: "javascript",  // Пошук по ключовому слову
                budget: "500"     // Фільтр по бюджету
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Помилка отримання даних" });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
