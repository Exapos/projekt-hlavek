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

import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import React from 'react';


export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(74,70,63)",
  },
});

