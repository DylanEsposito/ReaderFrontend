// src/pages/About.js
import React from 'react';
import '../App.css'; // Add some basic styling here
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
      
function Home() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <h2 id="AboutBlurb"> So the purpose of this website to provide easy access to novels that have 
          been placed into the public domain. All of these novels should be easily accessible through the reader created.
          Simply click on a book from the library and starting reading.
        </h2>
        <h1 id="Disclaimer"> Disclaimer: I do not own any of these published works, I simply intended to provide free 
          access to these works made available in the public domain.
        </h1>
      </View>
    </SafeAreaView>
  )
}

export default Home;
