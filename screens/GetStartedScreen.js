import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator,
  AsyncStorage, } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs'    

class GetStartedScreen extends React.Component {
    static navigationOptions = {
      title: 'GetStarted',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <ImageBackground source={require('../assets/images/background.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.home_image}>
            <Image
              style={{width: 270, height: 300}}
              source={require('../assets/images/logo-half.png')}
            />
          </View>
  
          <View style={styles.container}>
            <Button
              buttonStyle={styles.button}
              title= "Get Started"
              raised= {true}
              onPress={this._signInAsync}
            />
          </View>
          
          
          
          
        </ImageBackground>
      
      );
    }
    _signInAsync = async () => {
      this.props.navigation.navigate('Auth');
    };
  }
  
  
  
  