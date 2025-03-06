import { executeRequest } from "../utils/dbHandler.js";
import sql from 'mssql';

const getProducto = async (req, res) => {
    try {
        const { palabra } = req.query;
        //console.log(palabra)
        const result = await executeRequest({
            query: 'sp_consultaPrecioProducto',
            inputs: [
              { name: 'busqueda', type: sql.VarChar, value: palabra },
              { name: 'opcion', type: sql.Int, value: 2 }
            ],
            isStoredProcedure: true
          });
        //console.log("Resultado de getProducto:", result);

        res.status(200).json({
            mensaje: "Consulta exitosa",
            respuesta: result,
        });
    } catch (err) {
        console.error("Error en getProducto:", err);
        res.status(500).json({
            error: "Error al consultar data",
            mensaje: err.message,
        });
    }
}

const getComboMarca = async (req, res) => {
    try {
        const { palabra } = req.query;

        const query =  `select idMarca,nombreMarca
                        from [dbo].[funNombreMarca_tabla]('${palabra}')
                        order by nombreMarca`;
        const result = await executeRequest({ query });
        console.log("Resultado de getComboMarca:", result);

        res.status(200).json({
            mensaje: "Consulta exitosa",
            respuesta: result,
        });
    } catch (err) {
        console.error("Error en getComboMarca:", err);
        res.status(500).json({
            error: "Error al consultar data",
            mensaje: err.message,
        });
    }
}

export default {
    getProducto,
    getComboMarca
}