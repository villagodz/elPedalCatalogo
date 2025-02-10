import express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import productosRoute from './src/routes/listaPrecio.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//CONFIGURACIONES
app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))

//USO DE RUTAS  

app.use('/api/producto', productosRoute);

//Iniciamos el servidor
app.listen(PORT, () => {
    //Mostramos mensaje en consola
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});