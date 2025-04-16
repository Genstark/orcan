import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import Auth from "../../components/auth";
import { StyleSheet } from "react-native";
import BottomTabIcons from "./Components/BottomTabIcons";
import Getstarted from "../../components/getstarted";
import Home from "../../components/home";
import Profile from "../../components/profile";
import Recommendation from "../../components/recommend";
import Clinics from "../../components/clinics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTab = createBottomTabNavigator();

function Bottomtab() {
  const isFocused = useIsFocused();
  const [userData, setuserData] = useState();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData = await AsyncStorage.getItem("user");
    console.log(
      "My Data Is: ",
      JSON.parse(userData)?.questionnaire?.qna?.length
    );
    setuserData(JSON.parse(userData)?.questionnaire?.qna?.length);
  };
  const styles = StyleSheet.create({
    navProperty: {
      backgroundColor: "#96BAC6",
      height: 70,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 0,
      borderTopWidth: 0.1,
      borderColor: "#1A1A22",
    },
  });
  return (
    <BottomTab.Navigator
      initialRouteName="BottomTabHome"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.navProperty },
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="BottomTabHome"
        component={
          userData === 0 || userData === null || userData === undefined
            ? Clinics
            : Home
        }
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <BottomTabIcons
              setbackground={() => setbackground(false)}
              focused={focused}
              num={1}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="BottomSearch"
        component={Recommendation}
        // component={Clinics}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <BottomTabIcons
              setbackground={() => setbackground(false)}
              focused={focused}
              num={2}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="BottomCircle"
        component={Profile}
        options={{
          title: "Circle",
          tabBarIcon: ({ focused }) => (
            <BottomTabIcons
              setbackground={() => setbackground(false)}
              focused={focused}
              num={3}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default Bottomtab;
