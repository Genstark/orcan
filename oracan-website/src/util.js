import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.oracan.in",
  // baseURL: "http://localhost:4000",
  timeout: 5000,
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// const baseUrl = "http://localhost:3000/";
const baseUrl = "https://oracan.in/";

export { instance, formatDate, baseUrl };
