import AsyncStorage 
from "@react-native-async-storage/async-storage";



export const saveToken =
async(token)=>{


    await AsyncStorage.setItem(
        "token",
        token
    );


};




export const getToken =
async()=>{


    return await AsyncStorage.getItem(
        "token"
    );


};





export const saveUser =
async(user)=>{


    await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
    );


};





export const getUser =
async()=>{


    const user =
    await AsyncStorage.getItem(
        "user"
    );



    if(!user){

        return null;

    }



    return JSON.parse(
        user
    );


};






export const clearStorage =
async()=>{


    await AsyncStorage.multiRemove(
        [
            "token",
            "user"
        ]
    );


};