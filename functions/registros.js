// functions/registros.js

let registros = [];  // Almacenaremos los registros en memoria

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);  // Parsear el cuerpo de la solicitud

        // Crear un nuevo registro con la fecha actual y los datos recibidos
        const nuevoRegistro = {
            fecha: new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }),
            datos: data
        };

        registros.push(nuevoRegistro);  // Almacenamos el registro en memoria
        console.log("Nuevo registro recibido:", nuevoRegistro);

        return {
            statusCode: 200,
            body: JSON.stringify({ mensaje: "Registro guardado correctamente" })
        };
    }

    return {
        statusCode: 405,  // Método no permitido si no es un POST
        body: JSON.stringify({ mensaje: "Método no permitido" })
    };
};
