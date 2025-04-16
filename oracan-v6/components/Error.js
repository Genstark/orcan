import React from "react";
import { View, Text } from "react-native";
function Error() {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#17181e",
      }}
    >
      <Text style={{ fontSize: 36, color: "white" }}>
        Error in loading stack!
      </Text>
    </View>
  );
}

export default Error;
