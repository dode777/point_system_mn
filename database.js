// Сервер болон мэдээллийн сангийн холболт
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB-тай холбогдох
mongoose.connect('mongodb://localhost:27017/pointsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Хэрэглэгчийн мэдээллийн сангийн загвар
const UserSchema = new mongoose.Schema({
    userId: String,
    points: Number
});

const User = mongoose.model('User', UserSchema);

// Оноо хадгалах API
app.post('/api/uploadPoints', async (req, res) => {
    try {
        const validData = req.body.filter(row => row.points >= 0);
        await User.insertMany(validData);
        res.json({ message: 'Оноо амжилттай хадгалагдлаа.' });
    } catch (error) {
        res.status(500).json({ message: 'Оноо хадгалах үед алдаа гарлаа.', error });
    }
});

// Серверийн портын тохиргоо
app.listen(3000, () => {
    console.log('Сервер 3000 дугаартай портоор ажиллаж байна.');
});
