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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

function Home() {
  const navigation = useNavigation();

  const [questions, setquestions] = useState([]);

  const [risk, setrisk] = useState("");
  const [content, setContent] = useState("");
  const [score, setscore] = useState();

  const fetchData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    console.log("My data", userData.questionnaire.percentage);
    let percent = userData.questionnaire.percentage;

    setscore(percent);
    if (percent > 70) {
      setrisk("Very High Risk");
      setContent(
        "Risk of oral cancer is determined to be very high, it is imperative to take immediate action.\n\n Individuals falling into this category should seek urgent medical attention and comprehensive screening for early detection and intervention. Lifestyle changes, including cessation of tobacco use and reducing alcohol consumption, are critical. Additionally, regular visits to healthcare professionals specializing in oral health are essential for ongoing monitoring and preventive measures."
      );
    } else if (percent < 70 && percent >= 50) {
      setrisk("High Risk");
      setContent(
        "A diagnosis of high risk for oral cancer necessitates proactive measures to mitigate potential health risks. \n\n Close monitoring by healthcare professionals specializing in oral health is vital, along with regular screenings for early detection. Lifestyle modifications, such as reducing tobacco and alcohol intake, can significantly reduce the risk. Moreover, adopting a balanced diet rich in fruits and vegetables can bolster the body's immune response and promote oral health."
      );
    } else if (percent < 50 && percent >= 30) {
      setrisk("Moderate Risk");
      setContent(
        "Individuals categorized as having a moderate risk of oral cancer should prioritize regular oral health check-ups and screenings.\n\n While the risk level is not as severe as higher categories, it is essential to remain vigilant and proactive. Adopting a healthy lifestyle, including avoiding tobacco products and limiting alcohol consumption, can help mitigate the risk. Education about the signs and symptoms of oral cancer is crucial for early detection and prompt intervention if any abnormalities arise."
      );
    } else if (percent < 30) {
      setrisk("Low Risk");
      setContent(
        "A diagnosis of low risk for oral cancer provides some reassurance, but it's essential to maintain good oral hygiene practices and attend regular dental check-ups.\n\n Although the risk level is comparatively lower, it's still crucial to avoid tobacco products entirely and consume alcohol in moderation. Engaging in a healthy lifestyle, including a balanced diet and regular exercise, can further reduce the risk. However, individuals should remain vigilant and promptly report any concerning symptoms or changes in oral health to their healthcare providers for further evaluation."
      );
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#FFFFFF30",
              width: "100%",
              margin: "auto",
              alignSelf: "center",
              paddingTop: "5%",
              paddingBottom: "4%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "#488092",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              }}
            >
              OraCan
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              borderRadius: 32,
              padding: 20,
              backgroundColor: "#488092",
              alignSelf: "center",
              justifyContent: "center",
              marginTop: "15%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 40,
                marginTop: "2%",
                fontWeight: "bold",
              }}
            >
              {risk}
            </Text>
          </View>
          <>
            <View
              style={[
                {
                  width: "90%",
                  backgroundColor: "#488092",
                  borderRadius: 32,
                  alignSelf: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  padding: 20,
                },
              ]}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 25,
                  padding: 12,
                }}
              >
                Kindly consult with Doctor
              </Text>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "justify",
                  fontSize: 18,
                  padding: 15,
                }}
              >
                {content}
              </Text>
            </View>
          </>
        </ScrollView>
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
    backgroundColor: "#ffffff33",
    zIndex: 11,
  },
  messageInput: {
    height: 30,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "#ffffff",
    marginTop: "5%",
  },
});

export default Home;
