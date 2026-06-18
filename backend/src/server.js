import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import socketHandler from "./socket/socketHandler.js";


dotenv.config();


connectDB();


const app = express();


app.use(cors());

app.use(express.json());


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/messages",
    messageRoutes
);



app.get("/",(req,res)=>{

    res.json({
        message:"Chat backend running"
    });

});


// create HTTP server

const server = http.createServer(app);


// attach socket

const io = new Server(
    server,
    {
        cors:{
            origin:"*"
        }
    }
);



socketHandler(io);



const PORT =
process.env.PORT || 5000;



server.listen(
    PORT,
    ()=>{

        console.log(
            `Server running on ${PORT}`
        );

    }
);