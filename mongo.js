const {MongoClient} = require('mongodb');

const URL = 'mongodb+srv://hyftest:test0102@testbed-qtc2h.azure.mongodb.net/test?retryWrites=true&w=majority';

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client =  new MongoClient(URL);

    try{
        await client.connect();
        const db = client.db();
        const result = db.collection('products').insertOne(newProduct);
        
    } catch {
        return res.json({message: 'Could not store data'});
    }
    client.close();

    res.json(newProduct);
}

const getProducts = async (req, res, next) => {
    let products;
    const client = new MongoClient(URL);

    try{
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch {
        return res.json({message: 'Could not retrieve products'});
    }
    client.close();
    res.json(products);
}

module.exports = {
    createProduct,
    getProducts
}