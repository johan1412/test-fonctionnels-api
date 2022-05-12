

const router = require('express').Router();
const Product = require('../model/Product');
const Tag = require('../model/Tag');
const verify  = require('../verifyToken');

router.post('/',verify ,async (req,res)=>{
    const tag = new Tag({
        label : req.body.label,
        product: req.body.product.id
    });
    try {
        const tagsave = await tag.save();
        const productById = await Product.findById(req.body.product.id);

        productById.tags.push(tag);
        await productById.save();
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/',verify, async (req,res)=>{
    try {
        const tags = await Tag.find();
        res.send(tags);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:tagId', verify ,async (req,res)=>{
    try {
        const tag = await Tag.findById(req.params.tagId);
        res.send(tag);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:tagId', verify ,async (req,res)=>{
    try {
        const rmovetag = await Tag.remove({_id:req.params.tagId});
        res.send(rmovetag);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:tagId', verify ,async (req,res)=>{
    try {
        const patchtag = await Tag.updateOne({_id:req.params.tagId},{$set:
            {
                label : req.body.label
            }});
        res.send(patchtag);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;