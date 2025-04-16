import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Bottomtab from "../Bottomtab";

const StackScreen2 = createNativeStackNavigator();

function Stack2() {
  return (
    <StackScreen2.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Home"}
    >
      <StackScreen2.Screen name="Home" component={Bottomtab} />
    </StackScreen2.Navigator>
  );
}

export default Stack2;
