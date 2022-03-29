import React from "react";
import { Header } from "react-native-elements";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

export const customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  ArchitectsDaughter: require("../assets/fonts/ArchitectsDaughter-Regular.ttf"),
  Calligraffitti: require("../assets/fonts/Calligraffitti-Regular.ttf"),
};

export default function AppHeader(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <AppLoading />;
  } else {
    return (
      <Header
        centerComponent={{
          text: "Chit Chat App",
          style: { color: "#fff", fontSize: 24, fontFamily: "Bubblegum-Sans" },
        }}
        containerStyle={{
          backgroundColor: "#6d56a3",
          justifyContent: "space-around",
        }}
      />
    );
  }
}
