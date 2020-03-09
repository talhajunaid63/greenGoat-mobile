import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator,
  AsyncStorage, } from 'react-native';
import { Button } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
              
            ],
            progress: false,
          };
      }

      componentWillMount() {
        this.renderMyData();
      }

      async renderMyData(){
        fetch('http://167.172.245.215/home_images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({ images : responseJson , progress: true})
        })
        .catch((error) => {
        console.error(error);
        });
      }
    static navigationOptions = {
      title: 'HomeScreen',
    };
    render() {
    if (this.state.progress == false){
        return (
            <View style={{marginTop: 200}}> 
            <ActivityIndicator size="large" color="#00ff00" /> 
            </View>
            )
        }
      const {navigate} = this.props.navigation;
      return (
        <ImageBackground source={require('../assets/images/background.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.home_slider}>
                <SliderBox
                    images={this.state.images}
                    autoplay
                    circleLoop
                    />
                </View>
        
                <View style={styles.home_button}>
                    <Button
                    buttonStyle={styles.button}
                    title= "What's my stuff Worth?"
                    titleStyle={{fontSize: 20}}
                    raised= {true}
                    onPress={() => this.props.navigation.navigate('Donation')}
                    />
                </View>
            </View>  
        </ImageBackground>
      
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },

      home_button: {
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
    justifyContent: 'center'
      },
   
      button: {
        backgroundColor: '#5EA64A',
        width: 300,
      },
      home_slider:{
        marginTop: 150,
      },
  })