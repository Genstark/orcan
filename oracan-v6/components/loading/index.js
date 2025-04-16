import React from "react";
import { Image, View } from "react-native";

function Loading() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        // top: 0,
        bottom: 0,
        backgroundColor: "#000000a0",
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: "https://retchhh.files.wordpress.com/2015/03/loading1.gif",
        }}
        style={{
          width: 200,
          height: 200,
          justifyContent: "center",
          alignSelf: "center",
        }}
      />
    </View>
  );
}

export default Loading;
