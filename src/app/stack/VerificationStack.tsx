import HistoryVerificationScreen from "@/screens/verificationScreens/HistoryVerifivationScreen/HistoryVerificationScreen";
import VerificationChooseObjectScreen from "@/screens/verificationScreens/VerificationChooseObjectScreen/VerificationChooseObjectScreen";
import VerificationMainScreen from "@/screens/verificationScreens/VerificationMainScreen/VerificationMainScreen";
import VerificationNfcListScreen from "@/screens/verificationScreens/VerificationNfcListScreen/VerificationNfcListScreen";
import VerifiacationScanScreen from "@/screens/verificationScreens/VerificationScanScreen/VerificationScanScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const VerifiacationStack = () => {
  return (
    <Stack.Navigator  initialRouteName="VerificationMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ gestureEnabled: false }} name="VerificationMain" component={VerificationMainScreen} />
      <Stack.Screen name="VerificationHistory" component={HistoryVerificationScreen} />
      <Stack.Screen name="VerificationChooseObject" component={VerificationChooseObjectScreen} />
      <Stack.Screen name="VerificationScan" component={VerifiacationScanScreen} />
      <Stack.Screen name="VerificationNfcListScreen" component={VerificationNfcListScreen} />
    </Stack.Navigator>
  );
};