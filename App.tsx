/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { AppNavigator } from '@/app/navigation/AppNavigator';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NfcManager from 'react-native-nfc-manager';
import { useLayoutEffect } from 'react';

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
