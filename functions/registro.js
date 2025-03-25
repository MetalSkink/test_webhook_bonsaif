// functions/registro.js

let registros = [];

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        const nuevoRegistro = {
            fecha: new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }),
            datos: data
        };

        registros.push(nuevoRegistro);
        console.log("Nuevo registro recibido:", nuevoRegistro);

        return {
            statusCode: 200,
            body: JSON.stringify({ mensaje: "Registro guardado" })
        };
    }

    return {
        statusCode: 405,  // Método no permitido
        body: JSON.stringify({ mensaje: "Método no permitido" })
    };
};
