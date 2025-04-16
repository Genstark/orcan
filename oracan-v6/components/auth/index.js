import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Loading from "../loading";
import axios from "axios";

function Auth() {
  const navigation = useNavigation();
  const [email, setemail] = useState();
  const [loading, setloading] = useState(false);

  const sendOtp = async () => {
    setloading(true);
    const emailRegex =
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/;

    if (!emailRegex.test(email)) {
      return alert("Invalid email format");
    } else if (email.length < 7) {
      return alert("Email is too short");
    }
    try {
      const response = await axios.post(
        `https://api.oracan.in/sendUserOtp`,
        {
          email: email,
          otp: Math.floor(100000 + Math.random() * 900000),
        }
      );
      if (response.status === 200) {
        setloading(false);
        alert(response.data.message);
        navigation.navigate("Otp", { email: email });
      } else {
        setloading(false);
        alert(`Unexpected status code`, response.status);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <View style={{}}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#D4E8ED", "#9BBEC8", "#39758899"]}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
                  top: "8%",
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
                  }}
                >
                  Welcome!
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
                  onChangeText={(text) => setemail(text)}
                  // onSubmitEditing={() => {
                  //   this.sendMessage();
                  // }}
                  // onResponderStart={() => {}}
                  placeholderTextColor="#ffffff"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="email"
                />

                <TouchableOpacity
                  style={{
                    marginTop: "10%",
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 12,
                  }}
                  onPress={() => {
                    sendOtp();
                    // navigation.navigate("Register");
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
                    Get Started
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
      {loading && <Loading />}
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
    // // elevation: 100,
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

export default Auth;
