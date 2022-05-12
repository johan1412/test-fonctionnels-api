

const router = require('express').Router();
const Product = require('../model/Product');
const verify  = require('../verifyToken');

router.post('/',verify ,async (req,res)=>{
    const product = new Product(req.body);
    try {
        const productsave = await product.save();
        res.status(201).send(productsave);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/',verify, async (req,res)=>{
    try {
        const products = await Product.find();
        res.send(products);
        // res.setHeader('Access-Control-Allow-Origin','*');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:produitId', verify ,async (req,res)=>{
    try {
        const product = await Product.findById(req.params.produitId);
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:produitId', verify ,async (req,res)=>{
    try {
        const rmoveproduct = await Product.remove({_id:req.params.produitId});
        res.send(rmoveproduct);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:produitId', verify ,async (req,res)=>{
    try {
        const rmoveproduct = await Product.updateOne({_id:req.params.produitId},{$set:
            {
                name : req.body.name,type : req.body.type,
                price : req.body.price,
                rating : req.body.rating,
                warranty_years : req.body.warranty_years,
                available : req.body.available
            }});
        res.send(rmoveproduct);
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;