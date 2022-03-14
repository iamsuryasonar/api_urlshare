const router = require('express').Router()
const User = require('../model/User')
const Joi = require('joi')
const {registerValidation, loginValidation} = require('../middleware/authValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register',async (req,res)=>{

    //validate the data before saving to database
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    //check if email exists in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists!!!')


    // hash password using bcrypt 
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    //calling User construction to create a new user with type User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword
    })
    try {
        // Mongoose provides a save function that will take a JSON 
        // object and store it in the database. Our body-parser (in our case express.json) middleware,
        // will convert the user’s input into the JSON format for us.

        const savedUser = await user.save();
        res.send("User Registered")
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req,res)=>{
    // validate the data before saving to database
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // check if email exists in the database and get the user's password(data) so that we can compare hashes
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email not found')

    const matched = await bcrypt.compare(req.body.password, user.password);
    if(!matched) return res.status(400).send('Invalid Password')

    // create token using jsonwebtoken library
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token)
    res.send("Logged In")
})


module.exports = router