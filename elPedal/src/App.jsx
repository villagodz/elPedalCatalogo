import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid2
} from '@mui/material';
import axios from 'axios';
import TarjetaProductos from "./components/TarjetaProductos.jsx";

function App() {
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  
  // Paginación en el front
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // fijos o configurables

  useEffect(() => {
    getProductos();
    getMarcas();
  }, []);

  const getProductos = async () => {
    try {
      const response = await axios.get("/api/producto");
      const data = response.data.respuesta.recordset;
      setProductos(data);
    } catch (error) {
      console.log("Error al obtener productos:", error);
    }
  };

  const getMarcas = async () => {
    try {
      const response = await axios.get("/api/marca");
      const data = response.data.respuesta.recordset;
      setMarcas(data);
    } catch (error) {
      console.log("Error al obtener marcas:", error);
    }
  };

  // Manejo de filtros
  const handleChangeMarca = (event) => {
    setMarcaSeleccionada(event.target.value);
    setCurrentPage(1); // reset a la página 1 al cambiar la marca
  };

  // Filtrado por texto y marca
  const productosFiltrados = productos.filter((producto) => {
    const coincideTexto = producto.nombreProducto
      .toLowerCase()
      .includes(filtro.toLowerCase());

    const coincideMarca = !marcaSeleccionada || producto.idMarca === marcaSeleccionada;

    return coincideTexto && coincideMarca;
  });

  // Lógica de paginación en el front
  const lastIndex = currentPage * itemsPerPage; // p.e. página 1 -> 6; página 2 -> 12; etc.
  const firstIndex = lastIndex - itemsPerPage;  // p.e. página 1 -> 0; página 2 -> 6; etc.
  const productosPaginados = productosFiltrados.slice(firstIndex, lastIndex);
  
  // Cantidad total de páginas
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  // Pasar a página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Pasar a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* FILTRO POR TEXTO */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Buscar producto"
          size="small"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setCurrentPage(1); // regresar a la página 1 al cambiar el texto
          }}
          sx={{ flexGrow: 1, marginRight: 2 }}
        />
      </Box>

      {/* COMBO MARCAS */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120, marginRight: 2 }}>
          <InputLabel id="marca-label">Marca</InputLabel>
          <Select
            labelId="marca-label"
            id="marca-select"
            label="Marca"
            value={marcaSeleccionada}
            onChange={handleChangeMarca}
          >
            <MenuItem value="">Todas</MenuItem>
            {marcas.map((marca) => (
              <MenuItem key={marca.idMarca} value={marca.idMarca}>
                {marca.nombreMarca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* RENDERIZAR PRODUCTOS PAGINADOS */}
      <Box sx={{ marginTop: 4 }}>
        <Grid2 container spacing={2} sx={{ alignItems: "center" }}>
          {productosPaginados.map((producto) => (
            <Grid2
              xs={12}
              sm={6}
              key={producto.codigo}
              sx={{ alignItems: "center" }}
            >
              <TarjetaProductos producto={producto} />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* BOTONES DE PAGINACIÓN */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <Box sx={{ margin: '0 16px', alignSelf: 'center' }}>
          Página {currentPage} de {totalPages}
        </Box>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}

export default App;
