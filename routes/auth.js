const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
 


router.post('/register', async (req,res)=>{
    
    let data = req.body

    // LETS VALIDATE A DATA BEFORE WE CREATE A USER 
    //const {error} = registerValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].messsage);  

    // CHECK PASSWORD IF EXIST
    
    const emailExist = await User.findOne({email : req.body.email});
    if (emailExist) return res.status(400).send("Email already exists");  

    // HASH PASSWORD
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(req.body.password,salt);

    data.password = hashedPassword

    const user = new User(
        data
    );
    try {
        const savedUser = await user.save();
        // res.send({user : user._id});
        res.send(savedUser);
    }catch(err) {
        console.error(err)
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res)=>{
    // LETS VALIDATE A DATA BEFORE WE CREATE A USER 
    // const {error} = loginValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].messsage);  

    // CHECK PASSWORD IF EXIST
    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send("Email is not found");  

    // HASH PASSWORD
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send("Invalid password!!");  

    // CEEATE AND SIGN A TOKEN
    const token =  jwt.sign({_id: user._id}, process.env.TOKEN_SECRET); 
    res.header('auth-token',token).send(token);
    //res.send('Logged in !!!');
})

router.get('/', async (req, res)=> {
    try {
        const user = await User.find();
        res.send(user);
        // res.setHeader('Access-Control-Allow-Origin','*');
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:userId',async (req,res)=>{
    try {
        const user = await User.remove({_id:req.params.userId});
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;