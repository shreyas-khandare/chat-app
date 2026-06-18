import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const router = express.Router();


// REGISTER

router.post("/register", async(req,res)=>{

    try{

        const {
            username,
            password
        } = req.body;


        if(!username || !password){

            return res.status(400).json({
                message:"All fields required"
            });

        }


        const existingUser =
        await User.findOne({
            username
        });


        if(existingUser){

            return res.status(400).json({
                message:"User already exists"
            });

        }



        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );



        const user =
        await User.create({

            username,

            password:hashedPassword

        });



        res.status(201).json({

            message:"User created",

            user:{
                id:user._id,
                username:user.username
            }

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});

// LOGIN

router.post("/login", async(req,res)=>{

    try{

        const {
            username,
            password
        } = req.body;


        if(!username || !password){

            return res.status(400).json({
                message:"All fields required"
            });

        }


        const user = await User.findOne({
            username
        });


        if(!user){

            return res.status(401).json({
                message:"Invalid credentials"
            });

        }



        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );



        if(!isMatch){

            return res.status(401).json({
                message:"Invalid credentials"
            });

        }



        const token = jwt.sign(
            {
                id:user._id,
                username:user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );



        res.json({

            token,

            user:{
                id:user._id,
                username:user.username
            }

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


});



export default router;