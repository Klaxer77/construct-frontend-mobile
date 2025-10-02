import InitialScreen from '@/screens/authStackScreens/InitialScreen/InitialScreen';
import LoginScreen from '@/screens/authStackScreens/LoginScreen/LoginScreen';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    > 
      <Stack.Screen name="InitialScreen" component={InitialScreen} /> 
      <Stack.Screen options={{ gestureEnabled: false }} name="Auth" component={LoginScreen} />
    </Stack.Navigator>
  );
}