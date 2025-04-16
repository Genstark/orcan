import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Loading from "../loading";
import { useDispatch } from "react-redux";
import { updateStack } from "../../redux/Action";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Otp() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [loading, setloading] = useState(false);
  const [email, updateEmail] = useState("");
  useEffect(() => {
    const { email } = route.params;
    console.log("Email received:", email);
    updateEmail(email);
  }, []);
  const route = useRoute();

  const initiate = async () => {
    const emailRegex =
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/;

    if (!emailRegex.test(email)) {
      return alert("Invalid email format");
    } else if (email.length < 7) {
      return alert("Email is too short");
    } else if (value.length !== 6) {
      return alert("OTP length incorrect");
    }
    setloading(true);
    try {
      const response = await axios.post(
        `https://api.oracan.in/userOtpVerification`,
        {
          email: email,
          otp: value,
        }
      );

      if (response.status === 200) {
        setloading(false);
        const userData = response?.data?.userData;
        console.log(userData);
        alert(response.data.message);
        if (userData?.name === null || userData?.name === undefined) {
          navigation.navigate("Register", { email: userData.email });
        } else {
          console.log("User Data is: ", userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
          dispatch(updateStack("User"));
        }
      } else {
        setloading(false);
        alert(response.data.message);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

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

      <SafeAreaView
      // style={{ height: "100pt", backgroundColor: "red" }}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={{ backgroundImage: "url(`${require('../../assets/Login.png')}`)" }}
      >
        <View>
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
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  OTP Verification
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#505050",
                    marginTop: "15%",
                  }}
                >
                  OTP
                </Text>
                <CodeField
                  ref={ref}
                  {...props2}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  autoComplete="sms-otp"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />

                <TouchableOpacity
                  style={{
                    marginTop: "30%",
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 12,
                  }}
                  onPress={() => {
                    initiate();
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
                    Verify OTP
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
                      navigation.navigate("Register");
                    }}
                  >
                    {/* <Text
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
                      Want to update number?
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: "center",
                          color: "#fff",
                          // marginTop: "5%",
                        }}
                      >
                        &nbsp;9999999999
                      </Text>
                    </Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
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
    borderBottomColor: "white",
    // paddingHorizontal: 10,
    color: "#ffffff",
    marginTop: "5%",
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    height: 46,
    width: 46,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    // borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    color: "#000",
  },
  // focusCell: {
  //   borderColor: "#00F9DA",
  // },
});

export default Otp;
