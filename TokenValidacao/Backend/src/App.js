import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createUsuario, login, readUsuario, verificaToken } from './controllers/LoginControllers.js';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/usuario', createUsuario)
app.get('/usuario', readUsuario)
// app.put('/usuario/:id_usuario', upedateUsuario)
// app.delete('/usuario/:id_usuario',deleteUsuario)

app.post('/login', login);
app.get('/verifica', verificaToken)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});