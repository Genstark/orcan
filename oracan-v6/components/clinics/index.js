import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  FlatList,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Cities from "../cities";
import { SafeAreaView } from "react-native-safe-area-context";
import cityStateData from "../../assets/city-state.json";
import axios from "axios";
function Clinics() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userData, updateUserData] = useState([]);
  const statesArray = Object.keys(cityStateData);
  const [state, updateState] = useState("");
  const [cities, updateCities] = useState([]);
  const [city, updateCity] = useState("");
  const [clinics, setClinics] = useState([]);

  const handleStateChange = (e) => {
    const state = e;
    updateState(state);
    updateCity("");
    setDropdownVisible(!isDropdownVisible);
    if (state === "") {
      updateCities([]);
    } else {
      updateCities(cityStateData[state]);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const renderFooter = () => {
    return <View style={{ height: 200 }}></View>;
  };

  const fetchUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      let jsn = value ? JSON.parse(value) : null;
      updateUserData(jsn);
      updateState(jsn?.state);
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  const fetchClinics = async () => {
    if (state !== "") {
      console.log("In If", state);
      try {
        const response = await axios.post(
          `https://api.oracan.in/stateSpecifcClinic`,
          {
            state: state,
          }
        );
        console.log("response is", response.data.response);
        if (response.status === 200) {
          if (response?.data?.response?.length > 0) {
            setClinics(response?.data?.response);
          } else {
            setClinics([]);
          }
        } else if (response.status === 400) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
    // else {
    //   console.log(3);
    //   alert("Select a state");
    // }
  };

  useEffect(() => {
    console.log("in effect");
    console.log(state);
    fetchClinics();
  }, [state]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("Clinics data is", clinics);
  }, [clinics]);

  const renderItem = ({ item }) => {
    return (
      <View key={item._id}>
        <Text>Hello</Text>
        {/* <View
          style={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginVertical: 8,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{ margin: "auto", marginTop: "auto", marginBottom: "auto" }}
          >
            <Image
              source={{
                uri:
                  item?.images?.length > 0
                    ? item?.images[0]
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt6ZF_S9Gdp0RNYjcOT3jqX50bHAk-JS3wuuaq0emMFw&s",
              }}
              style={{ width: 96, height: 100, borderRadius: 15 }}
            />
          </View>
          <View
            style={{
              marginLeft: "6%",
              padding: 5,
              content: "contain",
              display: "flex",
            }}
          >
            <View style={{ width: "100%" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#505050" }}
              >
                {item.name}
              </Text>
            </View>
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontSize: 12,
                  display: "flex",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  marginTop: 10,
                  color: "#505050",
                }}
              >
                {item.address}
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 11,
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  marginTop: 6,
                  color: "#505050",
                }}
              >
                Open hours - 8:00 am to 6:00 pm
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginTop: 8,
                display: "flex",
                flexDirection: "row",
                width: "80%",
              }}
            >
              {item?.socialUrl[0] && (
                <TouchableOpacity
                  style={{
                    padding: 3,
                    backgroundColor: "#488092",
                    borderRadius: 50,
                    marginRight: 10,
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${item?.socialUrl[0]}`);
                  }}
                >
                  <MaterialIcons name="call" size={15} color="white" />
                </TouchableOpacity>
              )}
              {item?.address && (
                <TouchableOpacity
                  style={{
                    padding: 3,
                    backgroundColor: "#488092",
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    Linking.openURL(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        item?.address
                      )}`
                    );
                  }}
                >
                  <AntDesign name="arrowright" size={15} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View> */}
      </View>
    );
  };
  return (
    <>
      <LinearGradient
        colors={["#D4E8ED", "#9BBEC8", "#39758899"]}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -5,
        }}
      ></LinearGradient>
      <SafeAreaView>
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
            display: "flex",
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
              paddingLeft: 10,
            }}
          >
            OraCan
          </Text>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={toggleDropdown}
          >
            <View
              style={[
                styles.dropdownButton,
                {
                  position: "relative",
                  zIndex: 1,
                },
              ]}
            >
              <Text style={styles.selectedValue}>
                {state?.toLocaleUpperCase()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View>
          <View
            style={{
              // backgroundColor: "#15151B",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              //   borderBottomColor: "#22222C",
              //   borderBottomWidth: 1,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "#505050",
                textAlign: "left",
                width: "90%",
                marginBottom: "4%",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Oracan clinics can help you diagnose oral cancer. Checkout the
              nearby clinics in your state.
            </Text>
          </View>
        </View>

        <FlatList
          data={clinics}
          renderItem={({ item }) => (
            <View key={item._id}>
              <View style={[styles.box, { overflow: "hidden" }]}>
                <View style={styles.clinicImage}>
                  <Image
                    source={{
                      uri:
                        item?.images?.length > 0
                          ? item?.images[0]
                          : "https://res.cloudinary.com/duycnbpkp/image/upload/fl_preserve_transparency/v1712683193/23913_j2fs4h.jpg?_s=public-apps",
                    }}
                    style={{ width: 96, height: 100, borderRadius: 15 }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: "6%",
                    padding: 5,
                    content: "contain",
                    display: "flex",
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#505050",
                      }}
                      numberOfLines={1}
                    >
                      {item?.clinicName}
                    </Text>
                  </View>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        display: "flex",
                        // whiteSpace: "normal",
                        // overflowWrap: "break-word",
                        // marginTop: 10,
                        color: "#505050",
                      }}
                    >
                      {item?.address?.address}
                    </Text>
                  </View>
                  <View style={{ width: "100%" }}>
                    <Text
                      style={{
                        fontSize: 11,
                        // whiteSpace: "normal",
                        // overflowWrap: "break-word",
                        marginTop: 6,
                        color: "#505050",
                      }}
                    >
                      {item?.address?.state}, {item?.address?.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 8,
                      width: "80%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        // whiteSpace: "normal",
                        // overflowWrap: "break-word",
                        marginTop: 6,
                        color: "#505050",
                      }}
                    >
                      {item?.contactNo},&nbsp;
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        // whiteSpace: "normal",
                        // overflowWrap: "break-word",
                        marginTop: 6,
                        color: "#505050",
                      }}
                    >
                      {item?.clinicEmail}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={renderFooter}
        />

        <>
          {clinics?.length == 0 && (
            <View
              style={{
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: "10%",
                }}
              >
                No Clinic found in your place
              </Text>
            </View>
          )}
        </>
      </SafeAreaView>
      <Modal visible={isDropdownVisible} transparent>
        <TouchableHighlight
          style={styles.overlay}
          underlayColor="transparent"
          onPress={toggleDropdown}
        >
          <FlatList
            data={statesArray}
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
                  onPress={() => handleStateChange(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </TouchableHighlight>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  blurBox: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#ffffff33",
    zIndex: 11,
  },
  messageInput: {
    height: 30,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#565757",
    color: "#ffffff",
    marginTop: "3%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButton: {
    padding: 5,
    backgroundColor: "#E3EEF1",
    borderRadius: 4,
  },
  selectedValue: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  option: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
  box: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
  },
  clinicImage: {
    margin: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
});

export default Clinics;
