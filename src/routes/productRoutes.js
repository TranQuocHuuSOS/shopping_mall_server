const Router = require("express");
const {createNewProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct} = require("../controllers/productController");
const productRouter = Router();
productRouter.post('/create', createNewProduct);
productRouter.put('/update/:id',updateProduct);
productRouter.delete('/delete/:id',deleteProduct);
productRouter.get('/getAll',getAllProduct);
productRouter.get('/getDetail/:id',getDetailProduct);
module.exports = productRouter;