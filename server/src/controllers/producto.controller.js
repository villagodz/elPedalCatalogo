import { executeRequest } from "../utils/dbHandler.js";


const getProducto = async (req, res) => {
    try {
        const palabra = req.query;
        const query = `select p.codigo,p.nombreProducto,p.precio,s.cantidad
                        from producto p inner join stock s
                        on p.idProducto=s.idStock
                        inner join marca m
                        on m.idMarca=p.idMarca
                        where p.nombreProducto like 'moto%'
                        and p.idMarca=2
                        order by p.nombreProducto`;
        const result = await executeRequest({ query });
        console.log("Resultado de getProducto:", result);

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
        
        const query =  `select idMarca,nombreMarca
                        from [dbo].[funNombreMarca_tabla]('moto')
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