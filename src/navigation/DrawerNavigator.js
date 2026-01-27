import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();
console.log("AboutStackNavigator:", AboutStackNavigator);
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="About" component={AboutStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
