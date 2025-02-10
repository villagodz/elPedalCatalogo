import express from "express";
import productosController from "../controllers/producto.controller.js";

const router = express.Router();

// Ruta para conseguir los productos
router.get("/", productosController.getProducto);

// Ruta para cosneguir las marcas
router.get("/marca", productosController.getComboMarca);

export default router;