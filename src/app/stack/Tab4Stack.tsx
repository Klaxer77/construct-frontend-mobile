import Tab3Screen from "@/screens/Tab3Screen";
import Tab4Screen from "@/screens/Tab4Screen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Tab4Stack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tab4_main" component={Tab4Screen} />
    </Stack.Navigator>
  );
};