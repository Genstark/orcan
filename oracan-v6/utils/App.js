import { StatusBar } from "expo-status-bar";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Navigation />
    </Provider>
  );
}
