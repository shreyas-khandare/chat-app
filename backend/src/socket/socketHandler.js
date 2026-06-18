import jwt from "jsonwebtoken";
import Message from "../models/Message.js";



const socketHandler = (io)=>{


    // authentication middleware


    io.use((socket,next)=>{


        try{


            const token =
            socket.handshake.auth.token;



            if(!token){

                return next(
                    new Error(
                        "Authentication failed"
                    )
                );

            }



            const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


            socket.user = decoded;


            next();



        }
        catch(error){


            next(
                new Error(
                    "Invalid token"
                )
            );

        }


    });





    io.on(
        "connection",
        (socket)=>{


            console.log(
                "User connected:",
                socket.user.username
            );



            socket.on(
                "sendMessage",
                async(data)=>{


                    const message =
                    await Message.create({

                        sender:
                        socket.user.id,

                        senderName:
                        socket.user.username,

                        text:
                        data.text

                    });



                    io.emit(
                        "newMessage",
                        message
                    );


                }
            );





            socket.on(
                "disconnect",
                ()=>{

                    console.log(
                        "User disconnected"
                    );

                }
            );



        }
    );


};



export default socketHandler;