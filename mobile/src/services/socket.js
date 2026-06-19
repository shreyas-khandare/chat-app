import { io } from "socket.io-client";


let socket;


export const connectSocket = (token)=>{


    socket = io(
        "https://chat-app-backend-1yck.onrender.com",
        {
            auth:{
                token
            }
        }
    );


    return socket;

};



export const getSocket = ()=>{

    return socket;

};



export const disconnectSocket = ()=>{


    if(socket){

        socket.disconnect();

    }


};