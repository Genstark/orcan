import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
// import { increment } from "../../slice/slice";
import axiosInstance from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateStack } from "../../redux/Action";
import Loading from "../loading";

function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userData, setuserData] = useState();

  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchUserData();
    return () => {};
  }, []);

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const fetchUserData = async () => {
    const userData = await AsyncStorage.getItem("user");
    //console.log(JSON.parse(userData));
    setuserData(JSON.parse(userData));
  };

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      alert("Please enter current and new password")
      return;
    }
    if (password && password != confirmPassword) {
      setloading(true);
      const result = await axiosInstance.post(
        "https://api.oracan.in/updatePassword",
        {
          email: userData?.email,
          password: password,
          currentPassword: confirmPassword,
        }
      );
      //console.log(result);
      if (result.data.code == 401) {
        setloading(false);
        alert("Current password is not correct")
      } else {
        setloading(false);
        alert("Password updated")
        setconfirmPassword("");
        setpassword("");
        // await AsyncStorage.clear();
        // dispatch(increment("0"));
      }
    } else {
      setloading(false);
      alert("Password and new password must not be same")
    }
  };

  // behavior={Platform.OS === "ios" ? "padding" : "height"}
  // style={{ alignItems: "center", justifyContent: "center", flex: 1 }}

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#D4E8ED", "#9BBEC8", "#39758899"]}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -5,
        }}
      ></LinearGradient>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF30",
              width: "100%",
              margin: "auto",
              alignSelf: "center",
              paddingTop: "7%",
              paddingBottom: "4%",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              // flex: 1,
              // top: 0,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#488092",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
                // backgroundColor: "red",
                zIndex: -1,
              }}
            >
              Profile
            </Text>
            <>
              <View
                style={{
                  fontSize: 20,
                  color: "#505050",
                  zIndex: 3,
                  width: "50%",
                  marginLeft: "-20%",
                  // backgroundColor: "blue",
                  // textAlign: "",
                  // position: "absolute",
                }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    //console.log("hii");
                    await AsyncStorage.clear();
                    dispatch(updateStack("Auth"));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#505050",
                      zIndex: 1,
                      // backgroundColor: "red",
                      // width: "100%",
                      // marginLeft: "-30%",
                      // backgroundColor: "red",
                      // textAlign: "",
                      // position: "absolute",
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
          <ScrollView
            bounces={false}
            style={{
              height:
                Dimensions.get("window").height -
                (Dimensions.get("window").height * 8) / 100,
              // backgroundColor: "red",
            }}
          >
            <View style={{ marginTop: 18 }}>
              <Image
                source={
                  userData?.biometric?.imageUrl
                    ? { uri: userData?.biometric?.imageUrl }
                    : require("../../assets/user2.png")
                }
                style={{
                  alignSelf: "center",
                  margin: "auto",
                  marginTop: "3%",
                  width: 130,
                  height: 130,
                  borderRadius: 65,
                }}
              />
            </View>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 35,
                marginTop: "5%",
                fontWeight: "bold",
              }}
            >
              {userData?.name}
            </Text>
            <Text
              style={{
                color: "#565757",
                textAlign: "center",
                fontSize: 21,
                marginTop: "5%",
              }}
            >
              {userData?.email}
            </Text>
            <Text
              style={{
                color: "#565757",
                textAlign: "center",
                fontSize: 21,
                // marginTop: "5%",
                // paddingLeft: 15,
              }}
            >
              {/* +91-{userData?.phone} */}
            </Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={[
                  {
                    width: "90%",
                    marginTop: "10%",
                    backgroundColor: "#488092",
                    borderRadius: 32,
                  },
                ]}
              >
                <View style={{ padding: 18 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      marginTop: "1%",
                      textAlign: "center",
                    }}
                  >
                    General
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Date of Birth: {userData?.dob?.split("T")[0]}
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Location: {userData?.city}, {userData?.state}
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Gender: {userData?.gender}
                  </Text>
                  {/* <Text
                    style={{
                      marginTop: 5,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Biometric: {userData?.biometric?.type}
                  </Text> */}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {loading && <Loading />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  blurBox: {
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // elevation: 100,
    // position: "absolute",
    backgroundColor: "#ffffff33",
    zIndex: 11,
  },
  messageInput: {
    height: 30,
    // flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    // paddingHorizontal: 10,
    color: "#ffffff",
    marginTop: "3%",
  },
});

export default Profile;
