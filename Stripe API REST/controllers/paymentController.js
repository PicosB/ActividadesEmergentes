const paymentDAO = require('../dataAccess/paymentDAO');
const {AppError} = require('../utils/appError');

const createPayment = async (req, res) =>{
    try {
        const { amount, currency} = req.body;
        const payment = await paymentDAO.createPayment(amount, currency);

        res.json({ paymentLink: `http://localhost:3000/api/payments/payment/${payment.id}`});
    } catch (error) {
        throw new AppError('No se pudo completar el pago', 500);
    }
}

const showPaymentForm = async(req, res) =>{
    try {
        const payment =  await paymentDAO.getPaymentById(req.params.id);

        if(!payment) return res.status(404).json({message: 'Pago no encontrado'});

        res.sendFile(path.join(__dirname, '../public/payment.html'));

    } catch (error) {
        throw new AppError('No se encontró el Pago', 500);        
    }
}

const processPayment = async(req, res)=>{
    try {
        const payment =  await paymentDAO.updatePaymentStatus(req.params.id, 'completed');
        res.json({message: 'Pago procesado', payment});
        if(!payment) return res.status(404).json({message: 'Pago no encontrado'});

    } catch (error) {
        
    }
}

module.exports = {
    createPayment,
    showPaymentForm,
    processPayment
}