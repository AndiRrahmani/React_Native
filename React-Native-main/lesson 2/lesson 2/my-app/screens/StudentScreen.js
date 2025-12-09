import React from "react";
import { View ,Text,StyleSheet} from "react-native-web";
import StudentDetail from "../components/StudentDetail";

const StudentScreen =()=> {
    return(

        <View>
            <Text style={styles.text}>Student scrren</Text>
            <StudentDetail 
            name ="Donjeta" 
            image={require("../assets/person1.jpg")}
            ></StudentDetail>


            <StudentDetail name="Edeni"
             image={require("../assets/person1.jpg")}
            >

            </StudentDetail>
            <StudentDetail name ="Robert"
             image={require("../assets/person1.jpg")}
            
            ></StudentDetail>

        </View>

    )

}


const styles = StyleSheet.create({

    text:{
        textAlign:'center',
        fontSize :20,
        marginVertical:20
    }

})




export default StudentScreen;


