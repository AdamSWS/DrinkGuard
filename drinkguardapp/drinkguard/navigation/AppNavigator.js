import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountCreationScreen from "../screens/CreateAccount/AccountCreationScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import ContactsScreen from "../screens/Contacts/ContactsScreen";
import GetResultsScreen from "../screens/GetResults/GetResultsScreen";
import ContactSelectionScreen from "../screens/ContactSelection/ContactSelectionScreen";
import MyTabs from "./TabNavigator";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccountCreationScreen">
        <Stack.Screen
          name="AccountCreationScreen"
          component={AccountCreationScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
                <Stack.Screen
          name="ContactSelection"
          component={ContactSelectionScreen}
          options={{ title: 'Select Contact' }}
        />
        <Stack.Screen name="GetResultsScreen" component={GetResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
