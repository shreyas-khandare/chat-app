import axios from "axios";


const api = axios.create({

    baseURL:
    "https://chat-app-backend-1yck.onrender.com"

});


export default api;