const jwt = require('jsonwebtoken')

const verify = async(req,res,next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send("access denied")

    try{
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        res.status(400).send("Invalid token")
    }
}

module.exports.verify = verify