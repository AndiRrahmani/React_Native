import React from "react";
import { Text, StyleSheet, View } from "react-native";



const MainScreen2=()=>{

    return(
        <View style={styles.container}>
            <Text style={styles.textStyle} >This is main screen 2</Text>

        </View>
    );
};


const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: "#9c4c4cff",
        alignItems:"center"

    },

    textStyle:{
        fontSize: 30,
        
    },

// in line coment

/*
rreshti 1
rreshti 2

rreshti 3 */
    
    
})

export default MainScreen2