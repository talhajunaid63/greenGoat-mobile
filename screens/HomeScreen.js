import React from 'react';
import {
    StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator,
    AsyncStorage, Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import {BASE_URL} from "../config/NetworkConstants";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [

            ],
            progress: false,
          };

      }

   async remove_from_wishlist() {

        console.log("Token:",await AsyncStorage.getItem("userToken"));
       console.log("UID:",await AsyncStorage.getItem("uid"));
       console.log("client:",await AsyncStorage.getItem("uid"));
        console.log("Base_url:",BASE_URL+"checkout?");
        fetch(BASE_URL+"checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": await AsyncStorage.getItem("userToken"),
                uid: await AsyncStorage.getItem("uid"),
                client: await AsyncStorage.getItem("client")
            },
            body: JSON.stringify({
                    "price": 1400,
                    "number": 1234555567822129,
                    "expiry": "12/20",
                    "item_type": "item",
                    "id": 1
                }
            )
        })
            .then(response => response.json())
            .then(responseJson => {
                 console.log("ResponseJson:",responseJson);
            })

            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.remove_from_wishlist();

        }

    componentWillMount() {
        this.renderMyData();
      }

      async renderMyData(){
        fetch(BASE_URL+'home_images', {
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
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
                            To get an estimate of your materials and their value, we'll use the
                            greenGoat database to get you some numbers. Ready?
                        </Text>
                    </View>
                    <Button
                    buttonStyle={styles.button}
                    title= "What's My Stuff Worth?"
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
        marginTop: 30,
          padding:10,
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
