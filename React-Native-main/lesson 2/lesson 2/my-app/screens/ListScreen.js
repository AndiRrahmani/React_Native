import React from "react";
import { Text, StyleSheet, View, FlatList , Button,TouchableOpacity} from "react-native";

const students = [
  { name: "Eden", surname: "Rocha", age: "17" },
  { name: "Kaylen", surname: "Tyler", age: "15" },
  { name: "Ellie", surname: "Mcclure", age: "17" },
  { name: "Journey", surname: "Blackburn", age: "16" },
];

const ListScreen = () => {
  let count=0;
  return (
    <View>
      <Button 
         title="Click me"
         color="purple"
         onPress={()=>console.log("butoni eshte klikuar",count++)}
  
         >

      </Button>
      <Text style={styles.textStyle}> </Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.textStyle}>
            {item.name} {item.surname} — Age {item.age}
          </Text>
        )}
      />


      <TouchableOpacity
        style={styles.touchableBtn}
        onPress={()=>console.log("butoni eshte klikuar nga toucheble opacity",count++)}
      
      >
        <Text style={styles.btnText}>click here</Text>

      </TouchableOpacity>


    
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginVertical: 5,
  },
  btnText:{
    color:"white",
    textAlign:"center",
    fontSize:25,
    fontWeight:"bold"

  },
  touchableBtn:{
    backgroundColor:"purple",
    marginVertical:15,
    paddingVertical:20,
    borderRadius:6,
    marginHorizontal:20

  }
});

export default ListScreen;
