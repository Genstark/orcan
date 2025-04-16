import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Header({ title, icon, bgColor }) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: `${bgColor ? bgColor : "#c0c0c046"}`,
          borderBottomWidth: 1,
          paddingBottom: 10,
          //   backgroundColor: "red",
          //   backgroundColor: `${bgColor ? bgColor : "#000"}`,
        }}
      >
        {/* {icon && ( */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name={icon ? icon : ""} //chevron-left
            size={24}
            // color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        {/* )} */}

        <View
          style={{
            alignItems: "center",
            // width: "100%",
            zIndex: -1,
            // color: "white",
          }}
        >
          <Text
            style={{
              //   color: "white",
              fontSize: 16,
            }}
          >
            {title ? title : ""}
          </Text>
        </View>
        <View>
          {bgColor ? (
            <Entypo
              name={icon ? icon : "chevron-left"}
              size={24}
              color="white"
              style={{ marginRight: 8, color: bgColor }}
            />
          ) : (
            <>
              <Text></Text>
            </>
          )}
        </View>
      </View>
    </>
  );
}

export default Header;
