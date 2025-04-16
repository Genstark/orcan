import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";

function BottomTabIcons(props) {
  const navigation = useNavigation();

  return props.num === 1 ? (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 86,
      }}
    >
      <View
        style={{
          backgroundColor: `${props.focused ? "#488092" : ""}`,
          paddingVertical: 3,
          paddingHorizontal: 8,
          borderRadius: 5,
        }}
      >
        <Foundation name="home" size={30} color={"#ECECEC"} />
      </View>

      <Text
        style={{
          color: `${props.focused ? "#000" : "#ECECEC"}`,
          fontSize: 10,
        }}
      >
        Home
      </Text>
    </View>
  ) : props.num === 2 ? (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 86,
      }}
    >
      <View
        style={{
          backgroundColor: `${props.focused ? "#488092" : ""}`,
          paddingVertical: 3,
          paddingHorizontal: 8,
          borderRadius: 5,
        }}
      >
        <Foundation name="lightbulb" size={30} color="#ECECEC" />
      </View>
      <Text
        style={{
          color: `${props.focused ? "#000" : "#ECECEC"}`,
          fontSize: 10,
        }}
      >
        Recommendation
      </Text>
    </View>
  ) : (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 86,
      }}
    >
      <View
        style={{
          backgroundColor: `${props.focused ? "#488092" : ""}`,
          paddingVertical: 3,
          paddingHorizontal: 8,
          borderRadius: 5,
        }}
      >
        <FontAwesome name="user" size={30} style={{ color: "#ECECEC" }} />
      </View>

      <Text
        style={{
          color: `${props.focused ? "#000" : "#ECECEC"}`,
          fontSize: 10,
        }}
      >
        Profile
      </Text>
    </View>
  );
}

export default BottomTabIcons;
