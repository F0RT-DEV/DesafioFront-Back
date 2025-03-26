import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import url from 'url';
import { createFoto, deleteFoto, readFoto, shwoOneFoto, updateFoto } from './controllers/FotoController.js';
import cors from 'cors';


const port = 3000;
const app = express();

//pagando o caminho do arquivo 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//habilitando o cors
app.use(cors({
    origin: 'http://localhost:5173', // Permitir apenas esse domínio
}))

//habilitando uso do JSON 
app.use(express.json())
//habilitando uso de arquivos estáticos
app.use(fileUpload())

app.get('/',(req, res)=>{
    res.status(200).json({mensagem:"API Funcionando"})
})

app.post('/fotos', createFoto)
app.get('/fotos', readFoto)
app.put('/fotos/:id_foto', updateFoto)
app.delete('/fotos/:id_foto', deleteFoto)

app.get('/fotos/:id_foto', shwoOneFoto)

//criando uma rota para o arquivo
app.use('/public', express.static(path.join(__dirname,'..','public','img')))

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
