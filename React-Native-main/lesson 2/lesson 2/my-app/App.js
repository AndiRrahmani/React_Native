// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen";

import ListScreen from "./screens/ListScreen"; // 👈 like ListScreen in the example
import StudentDetail from "./components/StudentDetail";
import StudentScreen from "./screens/StudentScreen";

import BoxScreen from "./screens/BoxScreen";

import PostsScreen from "./screens/PostsScreen";

import FetchChallenge from "./screens/FetchChallenge";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="List"
    //     screenOptions={{
    //       title: "App",
    //     }}
    //   >
    //     <Stack.Screen name="Main" component={MainScreen} />

    //     <Stack.Screen name="List" component={ListScreen} />
    //   </Stack.Navigator>

    //   <StatusBar style="auto" />
    // </NavigationContainer>
   // <ListScreen></ListScreen>
    // <StudentScreen></StudentScreen>

    // <PostsScreen></PostsScreen>

    <FetchChallenge></FetchChallenge>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
