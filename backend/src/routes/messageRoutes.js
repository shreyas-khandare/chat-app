import express from "express";
import Message from "../models/Message.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();



router.get(
"/",
protect,
async(req,res)=>{


    try{


        const messages =
        await Message.find()
        .sort({
            createdAt:1
        });



        res.json(messages);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


});



export default router;