import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthStackScreen } from '../stack/authStack';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

export const AppNavigator: React.FC = () => {
  const Stack = createStackNavigator();


  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <Provider store={store}>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <PersistGate loading={null} persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true,
                gestureDirection: 'horizontal'
              }}
            >
              <Stack.Screen name="authStack" component={AuthStackScreen} />
              <Stack.Screen options={{ gestureEnabled: false }} name="main" component={TabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
      </GestureHandlerRootView>
    </PersistGate>
    </Provider>
  );
};
