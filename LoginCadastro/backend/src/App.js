import express from 'express';
import { createUsuario, deleteUsuario, login, readUsuario, upedateUsuario } from './controllers/UsuarioController.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/usuario', createUsuario)
app.get('/usuario', readUsuario)
app.put('/usuario/:id_usuario', upedateUsuario)
app.delete('/usuario/:id_usuario',deleteUsuario)

app.post('/login', login);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});