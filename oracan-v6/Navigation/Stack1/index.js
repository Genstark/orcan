import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../../components/auth";
import Getstarted from "../../components/getstarted";
import SignUp from "../../components/signup";
import Forgot from "../../components/forgot";
import Otp from "../../components/otp/index";

const StackScreen1 = createNativeStackNavigator();

function Stack1() {
  return (
    <StackScreen1.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"GetStarted"}
    >
      <StackScreen1.Screen name="GetStarted" component={Getstarted} />
      <StackScreen1.Screen name="Login" component={Auth} />
      <StackScreen1.Screen name="Register" component={SignUp} />
      <StackScreen1.Screen name="Otp" component={Otp} />
      <StackScreen1.Screen name="ForgotPassword" component={Forgot} />
    </StackScreen1.Navigator>
  );
}

export default Stack1;
