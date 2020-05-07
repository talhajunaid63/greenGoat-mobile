import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


export default class LogOutScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>



      </ScrollView>
    );
  }
}

LogOutScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="ios-log-out" style={{ fontSize: 20 }} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#089D37',
    padding: 20,
    textAlign: "center"
  },

  paragraph: {
    padding: 10,
    fontSize: 20,
    justifyContent: 'center'
  }

});