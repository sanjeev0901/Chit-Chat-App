import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
const Stack = createStackNavigator();

LogBox.ignoreLogs(["react-native-gesture-handler"]);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
