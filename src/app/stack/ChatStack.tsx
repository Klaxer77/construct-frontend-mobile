import ChatAvailableScreen from "@/screens/ChatStackScreens/ChatAvailableScreen/ChatAvailableScreen";
import ChatChooseObjectScreen from "@/screens/ChatStackScreens/ChatChooseObjectScreen/ChatChooseObjectScreen";
import ChatMainScreen from "@/screens/ChatStackScreens/ChatMainScreen/ChatMainScreen";
import ChatTalksScreen from "@/screens/ChatStackScreens/ChatTalksScreen/ChatTalksScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={ChatMainScreen} />
      <Stack.Screen name="ChatChooseObject" component={ChatChooseObjectScreen} />
      <Stack.Screen options={{ gestureEnabled: false }} name="ChatAvailableObject" component={ChatAvailableScreen} />
      <Stack.Screen name="ChatTalks" component={ChatTalksScreen} />
    </Stack.Navigator>
  );
};