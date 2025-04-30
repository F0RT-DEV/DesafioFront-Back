import express from 'express';
import cors from 'cors';
import { createLocalETemperatura, deleteLocalETemperatura, getLocaisETemperaturas, updateLocalETemperatura} from './Controllers/ClimaControllers.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API FUNCIONANDO');
});

app.post('/locais', createLocalETemperatura)
app.get('/locais-e-temperaturas', getLocaisETemperaturas )
app.put('/locais/:id_locais', updateLocalETemperatura)
app.delete('/locais/:id_Local', deleteLocalETemperatura )

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});