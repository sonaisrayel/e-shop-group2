import  express from 'express';

const router = express.Router();

const {
    createPaymentMethod,
    deletePaymentMethod,
    updateUserPaymentMethod,
} = require('../controllers/payment-method-controller');

router.post('/',  createPaymentMethod);
router.post('/:paymentMethodId',  updateUserPaymentMethod);
router.delete('/:paymentMethodId',  deletePaymentMethod);

export default router;
