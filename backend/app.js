const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

mongoose.connect("mongodb+srv://mean_user:mD6VbXGgJOtXtWfK@cluster1.09v8nmt.mongodb.net/?retryWrites=true&w=majority").then(() => {
  console.log('Connected to database')
}).catch((err) =>{
  console.log(err)
})

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
// })

// app.use((req,res,next) => {
//   res.send('Hey')
// })

app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)


module.exports = app;
