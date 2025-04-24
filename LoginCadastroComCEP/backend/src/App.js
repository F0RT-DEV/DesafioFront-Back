import express from 'express';
import cors from 'cors';
import { createUsuario, deleteUsuario, login, readUsuario, updateUsuario } from './controllers/UserController.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/user', createUsuario)
app.get('/user', readUsuario )
app.put('/user/:id_user',updateUsuario)
app.delete('/user/:id_user',deleteUsuario)
app.post('/login', login);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});