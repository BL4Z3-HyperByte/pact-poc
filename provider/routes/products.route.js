const {
  productController,
  productDetailsContoller,
} = require('../contollers/product.contoller');

const productsRouter = require('express').Router();

productsRouter.get('/products', productController);
productsRouter.get('/products/:id', productDetailsContoller);

module.exports = { productsRouter };
