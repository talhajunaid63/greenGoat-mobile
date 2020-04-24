import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  ScrollView
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AwesomeAlert from "react-native-awesome-alerts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {BASE_URL} from "../config/NetworkConstants";

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showAlert: false,
      progress:false,
    };
  }
  static navigationOptions = {
    title: "Please sign in"
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View>
            <View style={styles.sign_in_page}>
              <Image
                style={{ width: 220, height: 160 }}
                source={require("../assets/images/logo.png")}
              />
            </View>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Email"
                  placeholderTextColor="#7777775c"
                  leftIcon={{
                    type: "font-awesome",
                    name: "user",
                    color: "#5EA64A"
                  }}
                  style={styles.input_style}
                  inputStyle={{ marginLeft: 16 }}
                  inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                  onChangeText={text => this.setState({ username: text })}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  placeholder="Password"
                  placeholderTextColor="#7777775c"
                  leftIcon={{
                    type: "font-awesome",
                    name: "key",
                    color: "#5EA64A"
                  }}
                  style={styles.input_style}
                  inputStyle={{ marginLeft: 15 }}
                  inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                  onChangeText={text => this.setState({ password: text })}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.container}>
                <Button
                  buttonStyle={styles.button}
                  title="Login"
                  titleStyle={{ fontSize:28 , size:28}}
                  raised={true}
                  onPress={this.LoginApi}
                />
              </View>
              <View style={styles.inputContainer}>
                <Button
                  title="Don’t Have an Account? Sign up here"
                  type="clear"
                  titleStyle={{ color: "#5EA64A" }}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                />
              </View>
            </View>
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title="Error"
              message="Wrong email or password"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={true}
              showConfirmButton={false}
              cancelText="Try again"
              confirmText=""
              confirmButtonColor="#DD6B55"
              overlayStyle={{ backgroundColor: "#0000" }}
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Main");
  };

  LoginApi = async () => {
    var success = false;
    fetch(BASE_URL+"auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        if (response.headers.get("access-token")) {
          console.log("kjnsjknxsjk", response);
          AsyncStorage.setItem(
            "userToken",
            response.headers.get("access-token")
          );
          AsyncStorage.setItem("uid", response.headers.get("uid"));
          AsyncStorage.setItem("client", response.headers.get("client"));
          success = true;
        } else {
          this.showAlert();
        }
        return response.json();
      })
      .then(responseJson => {
        if (success == true) {
          AsyncStorage.setItem(
            "user_name",
            (
              responseJson["data"]["firstname"] +
              responseJson["data"]["lastname"]
            ).toString()
          );
          AsyncStorage.setItem(
            "user_email",
            responseJson["data"]["email"].toString()
          );
          AsyncStorage.setItem(
            "user_id",
            responseJson["data"]["id"].toString()
          );
          this.props.navigation.navigate("Main");
        }
      })

      .catch(error => {
        console.error(error);
      });
  };
}

const styles = StyleSheet.create({
  drawer_header: {
    paddingTop: getStatusBarHeight(),
    flex: 1,
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  home_image: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50
  },

  sign_in_page: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 80
  },

  button: {
    backgroundColor: "#5EA64A",
    width: 250
  },

  input_style: {
    marginLeft: 20,
    flex: 1
  },

  inputContainer: {
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center"
  }
});
