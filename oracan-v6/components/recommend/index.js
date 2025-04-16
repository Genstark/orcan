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
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../loading";

function Recommendation() {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const [questions, setquestions] = useState([]);
  const [recommendation, setrecommendation] = useState([]);

  function generateRecommendations(qna) {
    const recommendations = [];

    qna.forEach((questionAnswer) => {
      const question = Object.keys(questionAnswer)[0];
      const answer = questionAnswer[question];

      if (answer.toLowerCase() === "yes") {
        switch (question) {
          case "Do you smoke?":
            recommendations.push("Stop smoking or reduce the frequency.");
            break;
          case "Do you consume alcohol?":
            recommendations.push(
              "Reduce the frequency of consuming alcohol and keep it occasional."
            );
            break;
          case "Any positive family history of cancer?":
            recommendations.push(
              "If there is any positive history of cancer in family get regular checkups."
            );
            break;
          case "Do you chew tobaco in any form?":
            recommendations.push("Quit consuming tobacco.");
            break;
          case "Presence of ULCER in mouth more than 2 weeks?":
            recommendations.push(
              "If you are experiencing ULCER in mouth for more than 2 weeks, rinse mouth with salt water."
            );
            break;
          case "Any white patches in mouth?":
          case "Any red patches in mouth?":
            recommendations.push(
              "If you notice abnormal patches in your mouth, it is highly recommended to get an appointment with the doctor."
            );
            break;
          case "Ever screened for oral cancer by dental practitioner?":
            recommendations.push(
              "If you are ever screened for oral cancer, make sure to get regular checkups with the dentist."
            );
            break;
          default:
            break;
        }
      }
    });

    return recommendations;
  }

  const fetchData = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      let recom = [];

      console.log("Data", userData.questionnaire.qna);
      console.log("Data2", userData.questionnaire);

      if (userData?.questionnaire?.qna) {
        recom = generateRecommendations(userData.questionnaire.qna);
      }

      setrecommendation(recom);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching recommendations!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView>
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

        <View
          style={{
            backgroundColor: "#FFFFFF30",
            width: "100%",
            margin: "auto",
            alignSelf: "center",
            paddingTop: "4%",
            paddingBottom: "4%",
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
              fontSize: 25,
              color: "#488092",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            Recommendations
          </Text>
          {/* <Text
            style={{
              fontSize: 25,
              color: "#505050",
              textAlign: "right",
            }}
          >
            Logout
          </Text> */}
        </View>
        <ScrollView
          // bounces={false}
          style={{
            height:
              Dimensions.get("window").height -
              (Dimensions.get("window").height * 3) / 100,
            // backgroundColor: "red",
            // marginTop: "5%",
          }}
        >
          {recommendation.length > 0 &&
            recommendation.map((e, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.blurBox,
                    {
                      marginLeft: 7,
                      marginRight: 7,
                      padding: 10,
                      marginTop: 10,
                      marginBottom: 10,
                      paddingLeft: 20,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "90%" }}>
                      <Text style={{ fontSize: 18, color: "#505050" }}>
                        {e}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                      }}
                    ></View>
                  </View>
                </View>
              );
            })}

          {recommendation.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "10%",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>No Recommendation</Text>
            </View>
          )}
        </ScrollView>
        {loading && <Loading />}
      </SafeAreaView>
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
    borderBottomColor: "#565757",
    // paddingHorizontal: 10,
    color: "#ffffff",
    marginTop: "3%",
  },
});

export default Recommendation;
