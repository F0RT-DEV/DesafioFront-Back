import express from 'express';
import cors from 'cors';
import { getClima } from './Controllers/ClimaControllers.js';
//import { Atualizarlocais, Cadastrarlocais, Deletarlocais, Listarlocais } from './Models/LocaisModels.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API FUNCIONANDO');
});

app.post('/locais', getClima)
// app.get('/locais', Listarlocais )
// app.delete('/locais/:id_local', Deletarlocais )
// app.put('/locais/:id_local', Atualizarlocais)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});