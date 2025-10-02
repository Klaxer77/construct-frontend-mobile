/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import YaMap from 'react-native-yamap';
import { AppNavigator } from '@/app/navigation/AppNavigator';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NfcManager from 'react-native-nfc-manager';
import { useLayoutEffect } from 'react';

YaMap.init('2d92509b-bc26-47db-976f-009a56f36441');

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  
  useLayoutEffect(() => {
    NfcManager.start()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['right', 'left']}
      >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
