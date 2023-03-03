/**
*  https://www.figma.com/file/md1gzwMT9bVJPeOToZ5GoO/Untitled?node-id=0%3A1&t=FaapmYF0gwFvHkGA-1
*
*
*TODO:
*  - Naučit to Péťu
*
*   Minimal Requirements 
*
*  - App is running on real mobile device (not on virtual simulator) 
*
*  - App has minimal three View and user can change between them 
*
*  - App has simple form with few imputs (f.g. input, switch, radio button, dropdown menu) 
*
*  - App has button to save inputs into local database storage 
*
*  - App on one view you shoul present records from local database 
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A463F' 
  },
});
