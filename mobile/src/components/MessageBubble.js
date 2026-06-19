import {
    View,
    Text,
    StyleSheet
} from "react-native";



export default function MessageBubble({
    message,
    isMine
}){


    return(

        <View

        style={[

            styles.box,

            isMine
            ? styles.mine
            : styles.other

        ]}

        >


            {
                !isMine &&

                <Text style={styles.sender}>

                    {message.senderName}

                </Text>
            }



            <Text style={styles.text}>

                {message.text}

            </Text>




            <Text style={styles.time}>

                {
                    new Date(
                        message.createdAt
                    )
                    .toLocaleTimeString(
                        [],
                        {
                            hour:"2-digit",
                            minute:"2-digit"
                        }
                    )
                }

            </Text>



        </View>

    );

}




const styles =
StyleSheet.create({


box:{


    padding:12,

    marginVertical:5,

    marginHorizontal:10,

    maxWidth:"75%",

    borderRadius:15


},



mine:{


    backgroundColor:"#DCF8C6",

    alignSelf:"flex-end"


},



other:{


    backgroundColor:"#EEEEEE",

    alignSelf:"flex-start"


},



sender:{


    fontWeight:"bold",

    marginBottom:3


},



text:{


    fontSize:16


},



time:{


    fontSize:11,

    alignSelf:"flex-end",

    marginTop:5


}


});