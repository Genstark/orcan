import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  // baseURL: endpoint.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "",
  },
});

axiosInstance.interceptors.request.use(async function (config) {
  let user = JSON.parse(await AsyncStorage.getItem("userData"));
  let jwtToken = await AsyncStorage.getItem("jwtToken");
  let refreshToken = await AsyncStorage.getItem("refreshToken");
  config.headers.Authorization = jwtToken ? jwtToken : "";
  config.headers.refreshToken = refreshToken ? refreshToken : "";
  return config;
});

export default axiosInstance;
