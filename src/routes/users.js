const express=require("express");
const userEsquema = require("../models/user");


const router = express.Router();

//create user
router.post("/users", (req,res) =>{
    const user = userEsquema(req.body);
    user
    .save()
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message:error}));
});

//get all users
router.get("/users",(req,res)=>{
    userEsquema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});
//get a user
router.get("/users/:id",(req,res)=>{
    const{id }= req.params;
    userEsquema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//update a user
router.put("/users/:id",(req,res)=>{
    const { id } = req.params;
    const{name,age,email }= req.body;
    userEsquema
    .updateOne({ _id: id}, { $set: {name , age, email} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});
//delete a user
router.delete("/users/:id",(req,res)=>{
    const { id } = req.params;
    userEsquema
    .deleteOne({ _id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;

