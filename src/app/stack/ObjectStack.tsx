import ObjectActivationScreen from "@/screens/ObjectStackScreens/ObjectActivationScreen/ObjectActivationScreen";
import ObjectAvaialbelObjectScreen from "@/screens/ObjectStackScreens/ObjectAvailableScreen/ObjectAvailableScreen";
import ObjectChooseObjectScreen from "@/screens/ObjectStackScreens/ObjectChooseScreen/ObjectChooseScreen";
import ObjectCommentsScreen from "@/screens/ObjectStackScreens/ObjectCommentsScreen/ObjectCommentsScreen";
import ObjectContractorScreen from "@/screens/ObjectStackScreens/ObjectContractorScreen/ObjectContractorScreen";
import ObjectControlEntryScreen from "@/screens/ObjectStackScreens/ObjectControlEntryScreen/ObjectControlEntryScreen";
import ObjectControlFormScreen from "@/screens/ObjectStackScreens/ObjectControlFormScreen/ObjectControlFormScreen";
import ObjectControlOpenScreen from "@/screens/ObjectStackScreens/ObjectControlOpenScreen/ObjectControlOpenScreen";
import ObjectControlScreen from "@/screens/ObjectStackScreens/ObjectControlScreen/ObjectControlScreen";
import ObjectGeoTagsScreen from "@/screens/ObjectStackScreens/ObjectGeoTagsScreen/ObjectGeoTagsScreen";
import ObjectSendWorkScreen from "@/screens/ObjectStackScreens/ObjectSendWorkScreen/ObjectSendWorkScreen";
import ObjectTalksScreen from "@/screens/ObjectStackScreens/ObjectTalksScreen/ObjectTalksScreen";
import ObjectVerificationOpenScreen from "@/screens/ObjectStackScreens/ObjectVerificationOpenScreen/ObjectVerificationOpenScreen";
import ObjectWorkOpenScreen from "@/screens/ObjectStackScreens/ObjectWorkOpenScreen/ObjectWorkOpen";
import ObjectWorkScheduleScreen from "@/screens/ObjectStackScreens/ObjectWorkScheduleScreen/ObjectWorkScheduleScreen";
import ObjectWorkScreen from "@/screens/ObjectStackScreens/ObjectWorkScreen/ObjectWorkScreen";
import ObjectWorkVerificationScreen from "@/screens/ObjectStackScreens/ObjectWorkVerification/ObjectWorkVerification";
import ObjectCommentOpenScreen from "@/screens/ObjectStackScreens/ObjectСommentScreen/ObjectCommentScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
 
export const ObjectStack = () => {
  return (
    <Stack.Navigator initialRouteName="ObjectChooseObject" screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ gestureEnabled: false }} name="ObjectChooseObject" component={ObjectChooseObjectScreen} />
      <Stack.Screen name="ObjectContractor" component={ObjectContractorScreen} />
      <Stack.Screen name="ObjectGeoTags" component={ObjectGeoTagsScreen} />
      <Stack.Screen name="ObjectActivation" component={ObjectActivationScreen} />
      <Stack.Screen options={{ gestureEnabled: false }} name="ObjectAvailableObject" component={ObjectAvaialbelObjectScreen} />
      <Stack.Screen name="ObjectTalks" component={ObjectTalksScreen} />
      <Stack.Screen name="ObjectComments" component={ObjectCommentsScreen} />
      <Stack.Screen name="ObjectCommentOpen" component={ObjectCommentOpenScreen} />
      <Stack.Screen name="ObjectWork" component={ObjectWorkScreen} />
      <Stack.Screen name="ObjectWorkOpen" component={ObjectWorkOpenScreen} />
      <Stack.Screen name="ObjectWorkSchedule" component={ObjectWorkScheduleScreen} />
      <Stack.Screen name="ObjectWorkVerification" component={ObjectWorkVerificationScreen} />
      <Stack.Screen name="ObjectVerificationOpen" component={ObjectVerificationOpenScreen} />
      <Stack.Screen options={{ gestureEnabled: false }} name="ObjectSendWork" component={ObjectSendWorkScreen} />
      <Stack.Screen name="ObjectControl" component={ObjectControlScreen}/>
      <Stack.Screen name="ObjectControlEntry" component={ObjectControlEntryScreen}/>
      <Stack.Screen name="ObjectControlForm" component={ObjectControlFormScreen}/>
      <Stack.Screen name="ObjectControlOpen" component={ObjectControlOpenScreen}/>
    </Stack.Navigator>
  );
};