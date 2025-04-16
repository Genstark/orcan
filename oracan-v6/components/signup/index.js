import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import cityStateData from "../../assets/city-state.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../loading";
import { useDispatch } from "react-redux";
import { updateStack } from "../../redux/Action";
function SignUp() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const statesArray = Object.keys(cityStateData);
  const [state, updateState] = useState("");
  const [cities, updateCities] = useState([]);
  const [city, updateCity] = useState("");
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState();
  const [name, setname] = useState();
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("Male");
  const [show, setshow] = useState(false);
  const [genderModal, setgenderModal] = useState(false);
  const [selected, updateSelected] = useState("");

  useEffect(() => {
    const { email } = route.params;
    console.log("Email received:", email);
    setemail(email);
  }, []);

  const toggleDropdown = () => {
    //console.log("hii");
    setshow(!show);
  };

  const toggleStateCity = (x) => {
    setshow(!show);
    updateSelected(x);
  };

  const handleSignUp = async () => {
    try {
      setloading(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !name || !dob || !gender || !state || !city) {
        setloading(false);
        return alert("All fields are required.");
      } else if (!emailRegex.test(email)) {
        setloading(false);
        return alert("Invalid email address.");
      } else if (!isValidDate(dob)) {
        setloading(false);
        return alert("Invalid date of birth.");
      }
      console.log(email, name, dob, gender, state, city);
      const parts = dob.split("/");
      const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      const response = await axios.post(`https://api.oracan.in/updateUser`, {
        email: email,
        state: state,
        city: city,
        name: name,
        gender: gender,
        dob: isoDate,
      });
      if (response.status === 200) {
        setloading(false);
        const userData = response?.data?.userData;
        alert("User Data Updated Successfully!");
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        dispatch(updateStack("User"));
      } else if (response.status === 404) {
        setloading(false);
        alert("Try again later!");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setloading(false);
    }
  };

  const isValidDate = (dateString) => {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      console.log(1);
      return false;
    }
    if (year > 2024 || year < 1940) {
      return false;
    }
    const date = new Date(year, month, day);

    return (
      date.getDate() === day &&
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  };

  const handleStateChange = (e) => {
    const state = e;
    updateState(state);
    updateCity("");
    setshow(!show);
    if (state === "") {
      updateCities([]);
    } else {
      updateCities(cityStateData[state]);
    }
  };

  const handleCityChange = (e) => {
    updateCity(e);
    setshow(!show);
  };

  const handleDateChange = (e) => {
    if (e.length < dob.length) {
      // console.log(e.length);
      if (e.length === 5 || e.length === 2) {
        let a = e.slice(0, -1);
        console.log(a);
        setdob(a);
      } else {
        setdob(e);
      }
    } else if (e.length === 2 || e.length === 5) {
      let n = e + "/";
      // console.log(n);
      setdob(n);
    } else {
      setdob(e);
    }
  };
  return (
    <SafeAreaView
      style={{
        width: "100%",
      }}
    >
      {loading && <Loading />}
      <LinearGradient
        // Background Linear Gradient
        colors={["#D4E8ED", "#9BBEC8", "#39758899"]}
        style={{
          width: "100%",
          height: Dimensions.get("window").height,
          position: "absolute",
          zIndex: -5,
        }}
      ></LinearGradient>

      <KeyboardAvoidingView
        style={{
          width: "100%",

          height: Dimensions.get("window").height,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          bounces={false}
          style={[
            {
              width: "90%",
              flex: 1,
              height: Dimensions.get("window").height,
              // backgroundColor: "lightgreen",
              left: "5%",
              right: "5%",
              top: "2%",
            },
            // sstyles.blurBox,
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
              marginTop: "4%",
            }}
          >
            <Text
              style={{ fontSize: 25, color: "#505050", alignSelf: "center" }}
            >
              Register
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#505050",
                marginTop: "8%",
              }}
            >
              Full Name
            </Text>
            <TextInput
              // defaultValue={this.state.inputMessage}
              style={styles.messageInput}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setname(text)}
              placeholderTextColor="#ffffff"
            />
            <Text
              style={{
                fontSize: 15,
                color: "#505050",
                marginTop: "5%",
              }}
            >
              State
            </Text>
            <TouchableOpacity onPress={() => toggleStateCity("state")}>
              <TextInput
                style={styles.messageInput}
                placeholder="Select State"
                value={state}
                placeholderTextColor="#ffffff"
                editable={false}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                color: "#505050",
                marginTop: "5%",
              }}
            >
              City
            </Text>
            <TouchableOpacity onPress={() => toggleStateCity("city")}>
              <TextInput
                style={styles.messageInput}
                placeholder="Select City"
                value={city}
                placeholderTextColor="#ffffff"
                editable={false}
              />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                marginTop: "5%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#505050",
                    marginTop: "5%",
                  }}
                >
                  Date of Birth
                </Text>

                <TextInput
                  style={styles.messageInput}
                  placeholder="DD/MM/YYYY"
                  value={dob}
                  onChangeText={(e) => handleDateChange(e)}
                  placeholderTextColor="#ffffff"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#505050",
                    marginTop: "5%",
                  }}
                >
                  Gender
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setgenderModal(true);
                  }}
                >
                  <View style={styles.messageInput}>
                    {<Text style={{ color: "white" }}>{gender}</Text>}
                  </View>
                </TouchableOpacity>
                <Modal visible={genderModal} transparent>
                  <TouchableHighlight
                    style={styles.overlay}
                    underlayColor="transparent"
                    onPress={() => {
                      setgenderModal(!genderModal);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setgender("Male");
                          setgenderModal(false);
                        }}
                      >
                        <View
                          style={{
                            padding: 20,
                            borderRadius: 10,
                            borderBottomWidth: 1,
                          }}
                        >
                          <Text>Male</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setgender("Female");
                          setgenderModal(false);
                        }}
                      >
                        <View
                          style={{
                            padding: 20,
                            borderRadius: 10,
                            borderBottomWidth: 1,
                          }}
                        >
                          <Text>Female</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </TouchableHighlight>
                </Modal>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 5,
                borderRadius: 12,
                marginTop: "5%",
              }}
              onPress={() => {
                handleSignUp();
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
                Complete Registration
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal visible={show} transparent={true}>
        <TouchableHighlight
          style={styles.overlay}
          underlayColor="transparent"
          onPress={toggleDropdown}
        >
          <FlatList
            data={selected === "state" ? statesArray : cities}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{ width: "100%", backgroundColor: "white", flex: 1 }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#ccc",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: 16,
                    width: "100%",
                    flex: 1,
                  }}
                  onPress={() =>
                    selected === "state"
                      ? handleStateChange(item)
                      : handleCityChange(item)
                  }
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </TouchableHighlight>
      </Modal>
    </SafeAreaView>
  );
}

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default SignUp;
