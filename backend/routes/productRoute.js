import express from 'express'
import { addProduct, listProducts, removeProducts, singleProducts } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth,upload.fields([{name:'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), addProduct);
productRouter.delete('/:id',adminAuth, removeProducts);
productRouter.get('/list', listProducts);
productRouter.get('/:id', singleProducts);

export default productRouter;