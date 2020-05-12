import React from "react";
import { Image, ImageBackground, StyleSheet, View, Alert } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { BASE_URL } from "../config/NetworkConstants";
import Loader from "./Loader";

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      showAlert: false,
      Loader: false,
      errortitle: "Succces",
      errormessage: 'An email has been sent containing instructions for resetting your password',
      signup_success: "false",
    };
  }
  static navigationOptions = {
    title: "Forgot Password"
  };

  showAlert = (title, msg) => {
    this.setState({
      showAlert: true,
      errortitle: title,
      errormessage: msg
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
            {this.state.Loader === true && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Loader LoaderVisibles={this.state.Loader} />
              </View>
            )}
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
                  onChangeText={text => this.setState({ userEmail: text })}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.container}>
                <Button
                  buttonStyle={styles.button}
                  title="Submit"
                  titleStyle={{ fontSize: 28, size: 28 }}
                  raised={true}
                  onPress={this.ForgotApi}
                />

                <Button
                  type="clear"
                  titleStyle={{ color: "#5EA64A" }}
                  title="Back To Sign In"
                  onPress={() => this.props.navigation.navigate("Auth")}
                />
              </View>
            </View>
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title={this.state.errortitle}
              message={this.state.errormessage}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={true}
              showConfirmButton={false}
              cancelText={this.state.errortitle === 'Succces' ? "Close" : "Try again"}
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

  validate = (text) => {
    Alert.alert(text)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ emailError: text })
      Alert.alert('error', 'must be correct email')
      return false;
    }
    else {
      return true
    }
  }


  ForgotApi = async () => {
    if (this.state.userEmail != '') {
      let validate = this.validate(this.state.userEmail)
      var success = false;
      if (validate) {

        this.setState({ Loader: !this.state.Loader })
        await fetch('http://3.84.100.107/users/passwords', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: this.state.userEmail,
          })
        })
          .then(response => {

            return response.json()
          })
          .then(responseJson => {
            if (responseJson.success) {

              this.setState({
                Loader: !this.state.Loader,
                errormessage: responseJson['message'],
                errortitle: "Success",
                signup_success: "true"
              });

              Alert.alert("Success", responseJson['message']);
              setInterval(() => {
                // this.props.navigation.navigate("Auth");
              }, 1000)
            } else {
              this.setState({
                Loader: !this.state.Loader
              })
              Alert.alert('error', 'something Went Wrong');
            }
          })
          .catch(error => {
            console.error(error, 'errrrprrrr');
          });
      }
    }
    else {
      Alert.alert('Error', 'Email is required')
    }
  }

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
