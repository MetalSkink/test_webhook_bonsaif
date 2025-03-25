const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors()); // Permitir todas las peticiones
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable("x-powered-by");

app.use((req, res, next) => {
    console.log(`📢 Petición recibida: ${req.method} ${req.url}`);
    //console.log("🔍 Headers:", req.headers);
    console.log("📦 Body:", req.body);
    next();
});


let registros = []; // Se almacenan temporalmente los datos

// Ruta para recibir datos vía POST
app.post("/", (req, res) => {
    const nuevoRegistro = {
        fecha: new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }),
        datos: req.body
    };
    
    registros.push(nuevoRegistro);
    
    console.log("Nuevo registro recibido:", nuevoRegistro);
    res.status(200).send({ mensaje: "Registro guardado" });
});

// Página web para mostrar los registros
app.get("/", (req, res) => {
    let html = `
    <html>
    <head>
        <title>Registros Recibidos</title>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="5"> <!-- Recarga automática -->
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            table { width: 80%; margin: auto; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h2>Registros Recibidos</h2>
        <table>
            <tr>
                <th>Fecha</th>
                <th>Datos</th>
            </tr>`;
    console.log("# ~ app.get ~ registros:", registros);
    
    registros.forEach(registro => {
        html += `
            <tr>
                <td>${registro.fecha}</td>
                <td><pre>${JSON.stringify(registro.datos, null, 2)}</pre></td>
            </tr>`;
    });

    html += `
        </table>
        <p>Esta página se actualiza automáticamente cada 5 segundos.</p>
    </body>
    </html>`;
    
    res.send(html);
});

// Iniciar servidor en el puerto de Glitch
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
