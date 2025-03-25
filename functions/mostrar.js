// functions/mostrar.js

let registros = [];  // Los registros deben mantenerse en memoria

exports.handler = async (event, context) => {
    const html = `
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

    registros.forEach(registro => {
        html += `
            <tr>
                <td>${registro.fecha}</td>
                <td><pre>${JSON.stringify(registro.datos, null, 2)}</pre></td>
            </tr>`;
    });

    return {
        statusCode: 200,
        body: html
    };
};
