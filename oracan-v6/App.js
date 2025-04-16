import { StatusBar } from "expo-status-bar";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import store from "./redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigation />
    </Provider> 
  );
}
