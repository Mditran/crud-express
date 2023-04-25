const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes= require("./routes/users");
const path = require('path');
const cors = require('cors');

const app= express();
const port= process.env.port || 9000;

//middlware
app.use(cors());
app.use(express.json());
app.use('/api',userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'leerDatos.html'));
});

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Connected to MongoDB'))
.catch((error)=> console.error(error));


app.listen(port,()=> console.log('Server listening on port',port));

