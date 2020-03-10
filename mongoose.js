const mongoose = require('mongoose');

const Product = require('./models/product');

const URL = 'mongodb+srv://hyftest:test0102@testbed-qtc2h.azure.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URL)
.then(()=>console.log('Connected!'))
.catch(console.error);

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const result =  await createdProduct.save();

    res.json({product: result});
}

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json(products);
}

module.exports = {
    createProduct,
    getProducts
}