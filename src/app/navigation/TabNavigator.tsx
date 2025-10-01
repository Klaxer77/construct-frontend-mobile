import { TabBar } from '@/widgets/tab-bar/TabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileStack } from '../stack/profileStack';
import { ObjectStack } from '../stack/ObjectStack';
import { VerifiacationStack } from '../stack/VerificationStack';
import { ChatStack } from "../../app/stack/ChatStack"

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }} 
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => {
        const route = props.state.routes[props.state.index];
        if (route.state?.index != null) {
          const nestedRouteName =
            route.state?.routes[route.state.index]?.name ?? route.name;

          const hiddenScreens = ["ChatTalks", "ObjectTalks", "VerificationScan", "ObjectSendWork"];
          
          if (hiddenScreens.includes(nestedRouteName)) {
            return null;
          }
        }

        return <TabBar {...props} />;
      }}
    >
      <Tab.Screen
        name="ObjectStack"
        component={ObjectStack}
        options={{ title: 'Объекты' }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={{ title: 'Чат' }}
      />
      <Tab.Screen
        name="Verifiacation"
        component={VerifiacationStack}
        options={{ title: 'Верификация' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: 'Аккаунт' }}
      />
    </Tab.Navigator>
  );
};
