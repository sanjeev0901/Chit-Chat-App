import { View, StyleSheet, Alert } from "react-native";
import React from "react";
import * as Font from "expo-font";
import { Input, Button } from "react-native-elements";
import AppHeader, { customFonts } from "../components/Header";
import AppLoading from "expo-app-loading";
import { auth, db } from "../firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: name,
            photoURL: imageURL
              ? imageURL
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          })
          .then(() => {
            Alert.alert('You have been registered')
            navigation.navigate("")
          })
          .catch((error) => {
            console.log('error occured')
          });
      })
      .catch((error) => {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

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
          placeholder='Enter your Name'
          placeholderTextColor='red'
          onChangeText={(text) => setName(text)}
          label='Name'
          labelStyle={{ color: "black" }}
          value={name}
          leftIcon={{ type: "material", name: "badge" }}
          inputStyle={{color:'red'}}
        />
        <Input
          placeholder='Enter your Email'
          placeholderTextColor='red'
          onChangeText={(text) => setEmail(text)}
          label='Email'
          labelStyle={{ color: "black" }}
          value={email}
          leftIcon={{ type: "material", name: "email" }}
          inputStyle={{color:'red'}}
        />
        <Input
          placeholder='Enter your Password'
          placeholderTextColor='red'
          onChangeText={(text) => setPassword(text)}
          label='Password'
          labelStyle={{ color: "black" }}
          value={password}
          leftIcon={{ type: "material", name: "lock" }}
          secureTextEntry={true}
          inputStyle={{color:'red'}}
        />
        <Input
          placeholder='Enter Image URL(Optional)'
          placeholderTextColor='red'
          onChangeText={(text) => setImageURL(text)}
          label='Profile Picture'
          labelStyle={{ color: "black" }}
          value={imageURL}
          leftIcon={{ type: "material", name: "face" }}
          inputStyle={{color:'red'}}
        />
        <View style={{ alignItems: "center" }}>
          <Button
            title={"Register"}
            titleStyle={{ fontFamily: "ArchitectsDaughter" }}
            buttonStyle={styles.button}
            onPress={() => register()}
          />
          <Button
            title={"Already have an account?\n Login"}
            titleStyle={{ fontFamily: "ArchitectsDaughter" }}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bffc44",
  },
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
