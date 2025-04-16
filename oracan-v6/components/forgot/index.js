import React, { useState } from "react";
import {
  Button,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../../utils";
import Loading from "../loading";

function Forgot() {
  const navigation = useNavigation();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);

  const navigate = useNavigation();

  const handleCreateOtp = async () => {
    if (email && password) {
      setloading(true);
      const result = await axiosInstance.post(
        "https://api.oracan.in/createOtp",
        {
          email,
        }
      );
      //console.log(result.data);
      if (result.data.code == 200) {
        setloading(false);
        navigate.navigate("Otp", {
          email,
          password,
        });
      } else {
        setloading(false);
        alert("Please try after some time");
      }
    } else {
      setloading(false);
      alert("Please enter email and password");
    }
  };

  return (
    <>
      {loading && <Loading />}
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={[
              {
                width: "90%",
                height: "90%",

                left: "5%",
                right: "5%",
                top: "5%",
                bottom: "5%",
              },
              // styles.blurBox,
            ]}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 50, height: 50, alignSelf: "center" }}
            />
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 40,
                // marginTop: "10%",
              }}
            >
              OraCan
            </Text>
            <View
              style={{
                // backgroundColor: "red",
                width: "90%",
                // height: 400,
                margin: "auto",
                alignSelf: "center",
                marginTop: "15%",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#505050",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Forgot Password
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#505050",
                  marginTop: "15%",
                }}
              >
                Email
              </Text>
              <TextInput
                // defaultValue={this.state.inputMessage}
                style={styles.messageInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setemail(text.toLowerCase())}
                // onSubmitEditing={() => {
                //   this.sendMessage();
                // }}
                // onResponderStart={() => {}}
                placeholderTextColor="#ffffff"
              />
              <Text
                style={{
                  fontSize: 15,
                  color: "#505050",
                  marginTop: "5%",
                }}
              >
                New Password
              </Text>
              <TextInput
                // defaultValue={this.state.inputMessage}
                style={styles.messageInput}
                placeholder="Enter your password"
                secureTextEntry={true}
                onChangeText={(text) => setpassword(text)}
                // onChangeText={(text) => this.setState({ inputMessage: text })}
                // onSubmitEditing={() => {
                //   this.sendMessage();
                // }}
                // onResponderStart={() => {}}
                placeholderTextColor="#ffffff"
              />
              {/* <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 15 ,
                      textAlign: "right",
                      color: "#505050",
                      marginTop: "2%",
                    }}
                  >
                    Forgot Password ?
                  </Text>
                </TouchableOpacity> */}

              <TouchableOpacity
                style={{
                  marginTop: "10%",
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 12,
                }}
                onPress={() => {
                  handleCreateOtp();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#505050",
                    fontWeight: "bold",
                  }}
                >
                  Update Password
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: "#505050",
                      marginTop: "5%",
                      display: "flex",
                      // backgroundColor: "red",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Want to go back ?
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "#fff",
                        // marginTop: "5%",
                      }}
                    >
                      &nbsp;Login Now!
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
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
    borderBottomColor: "white",
    // paddingHorizontal: 10,
    color: "#ffffff",
    marginTop: "5%",
  },
});

export default Forgot;
