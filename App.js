import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScoreProvider } from './scorecontext';
import Stopwatch from './Stopwatch';

export default function App() {
  
  return (
    <ScoreProvider>
    <View style={styles.container}>
      <Text style={styles.buffer}> test </Text>
      <Stopwatch />
    </View>
    </ScoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#248232',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '8%'
  },
  title: {
    fontSize: 30,
    color: '#F6F4F6',
    marginBottom: '8%'
  },
  buffer: {
    color: '#248232'
  }
});