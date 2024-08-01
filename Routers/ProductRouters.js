const express = require('express');
const router = express();
const { ProductController } = require('../Controllers/ProductController');
const { createProductValidator, deleteProductValidator, getProductValidator,
 updateProductValidator  } = require("../Shared/Validator/productValidator")
const { isAdmin } = require('../Middlewares/isAdminMiddleware')


router.post('/', isAdmin, createProductValidator, ProductController.createProduct);
router.put('/:id', isAdmin, updateProductValidator, ProductController.updateProduct)
router.delete('/:id', isAdmin, deleteProductValidator, ProductController.deleteProduct)
router.get('/:id', getProductValidator , ProductController.getProductById);
router.get('/', ProductController.getProducts);

module.exports = router;