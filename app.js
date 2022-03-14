const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Joi = require('joi')


// import routes
const authRoute = require('./routes/authentication')
const linksRoute = require('./routes/links')

dotenv.config()

// connect to mongo database
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log("connected to database"))

// middleware express.json
// Returns middleware that only parses JSON and only looks at requests
// where the Content-Type header matches the type option.
// A new body object containing the parsed data is populated on the 
// request object after the middleware (i.e. req.body), or an empty object
// ({}) if there was no body to parse, the Content-Type was not matched, 
// or an error occurred.
app.use(express.json())

// route middleware
// basically it prefix adds /api/user to the route
app.use('/api/user', authRoute)
app.use('/api/link', linksRoute)

// listens to the port
app.listen(3000, console.log("server running on port 3000"))