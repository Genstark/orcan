import React from "react";
import { Button, Text, View, Image, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

function Getstarted() {
  const navigation = useNavigation();
  return (
    <View>
      {/* <image src={Image} /> */}
      <Image
        source={require("../../assets/9.png")}
        style={{ width: "100%", height: "100%" }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 111,
          backgroundColor: "#00000077",
        }}
      ></View>
      <View
        style={{
          width: "100%",
          height: "25%",
          position: "absolute",
          bottom: 0,
          zIndex: 111,
          // backgroundColor: "#000000",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 18, color: "#ffffff99" }}>
          Diagnose Today, Thrive Tomorrow:
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 22, color: "#ffffff99" }}>
          Fast-Track Your Wellness Journey!
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff99",
            width: 160,
            alignSelf: "center",
            marginTop: 15,
            borderRadius: 20,
            color: "#000000",
            padding: 8,
            textAlign: "center",
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          {/* <Button color="#000000" title=""></Button> */}
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Getstarted;
