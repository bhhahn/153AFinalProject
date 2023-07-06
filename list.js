import React, { useContext, Component } from 'react';
import { ScrollView, FlatList, StyleSheet, Text } from 'react-native';
import { ScoreContext } from './scorecontext';

let padToTwo = (number) => (number <= 9 ? `0${number}` : number);

const ListComponent = ({ lap }) => {
    return (
      <ScrollView style={styles.scroll}>
        <FlatList
          data={lap}
          renderItem={({ item, index }) => (
            <Text key={index} style={styles.item}>
              {`${item.initialHScore} - ${item.initialAScore}        `}
              {padToTwo(item.min)}:{padToTwo(item.sec)}:{padToTwo(item.msec)}
            </Text>
          )}
        />
      </ScrollView>
    );
  };



const styles = StyleSheet.create({
  scroll: {
    maxHeight: '63%',
    backgroundColor: '#44EE6F'
  },
  item: {
    padding: 10,
    fontSize: 22,
    height: 44,
    color: '#090C08',
    textAlign: 'center',
    backgroundColor: '#fff',
    marginBottom: 1
  }
});

export default ListComponent;