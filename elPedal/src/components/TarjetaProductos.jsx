import { Box, Card, CardContent, Typography } from "@mui/material";

function formatNumber (n) {

  n = String(n).replace(/\D/g, "");
  
  return n === '' ? n : Number(n).toLocaleString('es-VE');
}
  


const TarjetaProductos = ({ producto }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        padding: 1,
        alignItems: 'center',
        width: { xs: "18rem", sm: '20rem', md: '25rem'},
        height: '100%', // ◀️ Altura automática
        backgroundColor: '#DCDCDC',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: '0.3s'
        }
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          width: '100%',
          height: '100%',
          border: '1px solid black',
          borderRadius: '4px',
          overflow: 'hidden' // ◀️ Evita desbordamiento
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            marginBottom: 2,
            fontSize: { xs: '1rem', sm: '1.1rem' }, // ◀️ Tamaño responsivo
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {producto.nombreMercaderia}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            justifyContent: 'space-between',
            height: 'calc(100% - 40px)' // ◀️ Espacio para el título
          }}
        >
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Precio: {formatNumber(producto.precio)}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Cantidad: {producto.stock}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Marca: {producto.marca}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};


export default TarjetaProductos;
