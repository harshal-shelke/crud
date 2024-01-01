const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/userModel");
const router=express.Router();

//GET(READ)
router.get("/",async(req,res)=>{

    try{
        const showAll= await User.find();

        res.status(200).json(showAll);
    }
    catch (error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

//CREATE
router.post("/", async(req,res)=>{
    const {name,email,age}=req.body;

    try{
        const userAdded=await User.create({
            name:name,
            email:email,
            age:age,
        });

        res.status(201).json(userAdded);
    }
    catch (error){
        console.log(error);
        res.status(400).json({error:error.message});

    }
});

//SINGLE USER
router.get("/:id",async(req,res)=>{
    const {id}=req.params;

    try{
        const single= await User.findById({_id:id});

        res.status(200).json(single);
    }
    catch (error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

//DELETE
router.delete("/:id",async(req,res)=>{
    const {id}=req.params;

    try{
        const single= await User.findByIdAndDelete({_id:id});

        res.status(200).json(single);
    }
    catch (error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

//UPDATE
router.patch("/:id",async(req,res)=>{
    const {id}=req.params;
    const {name,email,age}=req.body;

    try{
        const update= await User.findByIdAndUpdate(id,req.body,{ new:true,});

        res.status(200).json(update);
    }
    catch (error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
})



module.exports=router; 