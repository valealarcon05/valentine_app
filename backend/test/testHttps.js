const http = require('http');

http.get('http://localhost:3000/api/usuarios', (res) => {
  let data = '';

  // Recibir datos por partes
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Finalizar la recepción de datos
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
    } catch (error) {
      console.error('Error al parsear JSON:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
