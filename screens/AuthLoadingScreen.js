import React from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import Global from "../config/GlobalState";

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    Global.firstName = await AsyncStorage.getItem('firstName');
    Global.lastName = await AsyncStorage.getItem('lastName')
    Global.img = await AsyncStorage.getItem('img')


    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}