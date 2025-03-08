const winston = require('winston');

//Configurar Winston para registrar errores en un archivo.

const loggger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ] 
})

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

//Funcion middleware para manejar errores.

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    loggger.error(err.message);

    //Enviar la respuesta json con el detalle del error
    res.status( err.statusCode).json({
        status: err.status,
        statusCode : err.statusCode,
        message: err.message,
        error: err
    })

}

module.exports = {
    AppError,
    globalErrorHandler
}
