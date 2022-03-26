import { View, StyleSheet } from "react-native";
import React from "react";
import { Input, Button } from "react-native-elements";
import AppHeader, { customFonts } from "../components/Header";
import AppLoading from "expo-app-loading";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync(customFonts);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <AppHeader />
        <Input
          placeholder='Enter your Email'
          placeholderTextColor='yellow'
          onChangeText={(text) => setEmail(text)}
          label='Email'
          labelStyle={{ color: "#4fe3d2" }}
          value={email}
          leftIcon={{ type: "material", name: "email" }}
        />
        <Input
          placeholder='Enter your Password'
          placeholderTextColor='yellow'
          onChangeText={(text) => setPassword(text)}
          label='Password'
          labelStyle={{ color: "#4fe3d2" }}
          value={password}
          leftIcon={{ type: "material", name: "lock" }}
          secureTextEntry={true}
        />
        <View style={{ alignItems: "center" }}>
          <Button
            title={"Login"}
            titleStyle={{ fontFamily: "ArchitectsDaughter" }}
            buttonStyle={styles.button}
          />
          <Button
            title={"New User?\n Register"}
            titleStyle={{ fontFamily: "ArchitectsDaughter" }}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e34f6d",
  },
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
