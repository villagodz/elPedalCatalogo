import { Box, Card, CardContent, Typography } from "@mui/material";

const TarjetaProductos = ({ producto }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        padding: 2,
        alignItems: 'center',
        width: '650px',
        backgroundColor: '#DCDCDC'
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          border: '1px solid black',
          borderRadius: '4px',
          marginLeft: '12px'
        }}
      >
        <Typography variant="h6">{producto.nombreProducto}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: "480px",
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="body1">Precio: {producto.precio}</Typography>
          <Typography variant="body1">Cantidad: {producto.cantidad}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TarjetaProductos;
