import React from 'react';
import {
    StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator,
    AsyncStorage, Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import {BASE_URL} from "../config/NetworkConstants";

import Global from "../config/GlobalState"

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [

            ],
            progress: true,
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

    getPaymentDone=async (token)=>{

        console.log("Token:",await AsyncStorage.getItem("userToken"));
        console.log("UID:",await AsyncStorage.getItem("uid"));
        console.log("client:",await AsyncStorage.getItem("uid"));
        console.log("Base_url:",BASE_URL+"orders");
        fetch(BASE_URL+"orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": await AsyncStorage.getItem("userToken"),
                uid: await AsyncStorage.getItem("uid"),
                client: await AsyncStorage.getItem("client")
            },
            body: JSON.stringify({
                "order": {
                    "amount": "500",
                    "token": "tok_1GdM0TGqiv2Za2k5s79vVKxc",
                    "order_type": "item",
                    "id": "9"
                }
                }
            )
        })
            .then(response => {
                console.log("response123:",response)

            console.log("response.json in payment",response.json())
            })
            .then(responseJson => {
                console.log("ResponseJson payment:",responseJson);
            })

            .catch(error => {
                console.log(error);
            });
    };

     getCreditCardToken = () => {
         console.log("caling:","home")
         const card = {
             'card[number]': "4242424242424242",
             'card[exp_month]': "01",
             'card[exp_year]': "23",
             'card[cvc]': 328
         };

         let STRIPE_PUBLISHABLE_KEY='pk_test_x7BQNZlks7cWynfPFdrXSnDs'
        return fetch('https://api.stripe.com/v1/tokens', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data to Stripe
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&')
        }).then(response =>{
            console.log("respons:",response)
            console.log("in response",response.json())
        }).catch((error=>{
            console.log("error i  payment:",error)
        }));
    };

     async getName(){
         let name=await AsyncStorage.getItem("user_name")
         console.log("Name:",name)
         Global.username=name
     }
    componentDidMount() {
        //this.remove_from_wishlist();

       // let data=this.getCreditCardToken()
        this.getPaymentDone()
       // console.log("data:",data)

            this.getName()
        }

    componentWillMount() {
       // this.renderMyData();
      }

      async renderMyData(){
        fetch(BASE_URL+'home_images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
        console.log("response before jsons:",response)
            response.json()
        })
        .then((responseJson) => {
            console.log("responseJson",responseJson)
            if(responseJson!==null && responseJson!==undefined) {
                this.setState({images: responseJson, progress: true})
            }
            else{
                this.setState({ progress: true})
            }
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
                    <View style={{marginVertical:10}}>
                    <Button
                        buttonStyle={styles.button}
                        title= "Marketplace"
                        titleStyle={{fontSize: 20}}
                        raised= {true}
                        onPress={() => this.props.navigation.navigate('MarketPlace')}
                    />
                    </View>
                    <Button
                        buttonStyle={styles.button}
                        title= "Activities"
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
