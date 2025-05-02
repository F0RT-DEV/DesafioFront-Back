import express from 'express';
import cors from 'cors';
import { createLocalETemperatura, deleteLocalETemperatura, getAllRecords, getLocaisETemperaturas, listarLocais, updateLocalETemperatura, updateRegistroPorIdTemperatura, deleteRegistroPorIdTemperatura} from './Controllers/ClimaControllers.js';


const app = express();
const PORT = 3000;

app.use(cors(
    {
        origin: 'http://localhost:5173', // URL do frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API FUNCIONANDO');
});

app.post('/locais', createLocalETemperatura)
app.get('/locais-e-temperaturas', getLocaisETemperaturas )
app.put('/locais/:id_locais', updateLocalETemperatura)
app.delete('/locais/:id', deleteLocalETemperatura )
app.get('/registros', getAllRecords);
app.put("/registros/:id", updateRegistroPorIdTemperatura);
app.delete("/registros/:id", deleteRegistroPorIdTemperatura);
app.get('/locais', listarLocais);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});