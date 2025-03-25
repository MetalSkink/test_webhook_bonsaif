const fs = require("fs");
const path = require("path");

const filePath = path.join("/tmp", "registros.json"); // Archivo temporal en el servidor

// Función para cargar registros
const cargarRegistros = () => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error al leer los registros:", error);
    }
    return [];
};

// Función para guardar registros
const guardarRegistros = (registros) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(registros, null, 2));
    } catch (error) {
        console.error("Error al guardar los registros:", error);
    }
};

// **Función Handler de Netlify**
exports.handler = async (event, context) => {
    let registros = cargarRegistros();

    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body);
        const nuevoRegistro = {
            fecha: new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }),
            datos: data
        };

        registros.push(nuevoRegistro);
        guardarRegistros(registros);

        return {
            statusCode: 200,
            body: JSON.stringify({ mensaje: "Registro guardado correctamente" })
        };
    }

    if (event.httpMethod === "GET") {
        let html = `
        <html>
        <head>
            <title>Registros Recibidos</title>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="5">
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

        return {
            statusCode: 200,
            headers: { "Content-Type": "text/html" },
            body: html
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido" })
    };
};
