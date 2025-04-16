import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Stack1 from "./Stack1";
import Stack2 from "./Stack2";
import Error from "../components/Error";
import { useSelector, useDispatch } from "react-redux";
import { updateStack } from "../redux/Action";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Navigation() {
  const type = useSelector((state) => state.stack);
  const dispatch = useDispatch();

  const [section, updateSection] = useState(type);
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "black",
    },
  };

  useEffect(() => {
    // Check AsyncStorage for stack value
    AsyncStorage.getItem("user")
      .then((value) => {
        if (value) {
          const userData = JSON.parse(value);
          if (userData?.name) {
            dispatch(updateStack("User"));
            updateSection("User");
          }
        }
      })
      .catch((error) => console.log("AsyncStorage error:", error));
  }, []);

  useEffect(() => {
    updateSection(type);
  }, [type]);

  return (
    <NavigationContainer theme={navTheme}>
      {section === "Auth" ? (
        <Stack1 />
      ) : section === "User" ? (
        <Stack2 />
      ) : (
        <Error />
      )}
    </NavigationContainer>
  );
}

export default Navigation;
