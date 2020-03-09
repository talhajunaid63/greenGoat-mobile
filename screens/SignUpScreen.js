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
  ScrollView,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  CheckBox
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import phone from "../assets/images/phone.png";
import land from "../assets/images/land.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";
import * as Permissions from "expo-permissions";

var radio_props = [
  { label: "Cellphone  ", value: "cell" },
  { label: "Landline", value: "landline" }
];

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      phone_type: "Cellphone",
      image_uri: null,
      image_base64: null,
      errormessage: "",
      errortitle: "",
      signup_success: "false",
      terms: false,
      dropdowndata: [
        {
          value: "Cellphone"
        },
        {
          value: "Landline"
        }
      ]
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
    if (this.state.signup_success == "true") {
      this.props.navigation.navigate("Auth");
    }
  };

  // getPhotoFromGallery = () => {
  //   ImagePicker.launchImageLibrary(null, (response)  => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     }
  //     else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }
  //     else {
  //       this.setState({ imageData: response });
  //     }
  //   });
  // };

  // showPickedImage() {
  //   const { imageData } = this.state;

  //   if (imageData !== null) {
  //       return (
  //         <Image
  //         source={{ uri: imageData.uri }}
  //         style={{ alignSelf: 'center', width: 200, height: 200 }}
  //         />
  //       );
  //   } else {
  //     return (
  //       <View>
  //         <TouchableHighlight
  //           style={styles.addPhoto}
  //           onPress={this.getPhotoFromGallery}
  //         >
  //           <Text style={styles.addPhotoText}>Add Photo</Text>
  //         </TouchableHighlight>
  //       </View>
  //     );
  //   }
  // }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.4
    });

    if (!result.cancelled) {
      this.setState({ image_uri: result.uri });
      this.setState({ image_base64: result.base64 });
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  handleCheckbox = val => {
    this.setState({
      terms: val
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.image_uri);
    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAwareScrollView
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}
        >
          <View style={styles.sign_in_page}>
            <Image
              style={{ width: 220, height: 160 }}
              source={require("../assets/images/logo.png")}
            />
          </View>

          <View style={styles.container}>
            <Text
              style={{
                color: "#ece6e6",
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 25,
                borderBottomColor: "#5EA64A",
                borderBottomWidth: 3
              }}
            >
              Sign up
            </Text>
            {/* <View
              style={{
                padding: 0,
                marginVertical: 10,
                backgroundColor: "#5EA64A"
              }}
            >
              <Button
                icon={{
                  name: "image",
                  color: "white",
                  type: "font-awesome"
                }}
                title="Add Profile Pic"
                onPress={this._pickImage}
                iconRight={true}
                raised={true}
                backgroundColor="#5EA64A"
                buttonStyle={styles.photo_button}
              />
            </View> */}
            <TouchableOpacity
              onPress={this._pickImage}
              style={{
                width: 100,
                height: 80,
                borderRadius: 40,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={
                  this.state.image_uri !== null
                    ? { uri: this.state.image_uri }
                    : require("../assets/user.png")
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 40
                }}
              />
              {/* {this.state.image_uri === null && (
                <Text style={styles.textPick}>Pick Avatar</Text>
              )} */}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Input
                placeholder="First Name"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ firstname: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Last Name"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ lastname: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Email"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ email: text })}
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
            <View style={styles.inputContainer}>
              <Input
                placeholder="Re-Type Password"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "key",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 15 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text =>
                  this.setState({ password_confirmation: text })
                }
                secureTextEntry={true}
              />
            </View>

            <View
              style={{
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  width: "40%"
                }}
              >
                <Image
                  source={this.state.phone_type === "Cellphone" ? phone : land}
                  style={{ width: "20%", height: 22 }}
                />
                <Dropdown
                  label=""
                  itemColor={"white"}
                  selectedItemColor={"white"}
                  containerStyle={{
                    width: "70%",
                    marginBottom: 15,
                    marginLeft: 15
                  }}
                  baseColor={"#5EA64A"}
                  inputContainerStyle={{ borderBottomColor: "white" }}
                  pickerStyle={{
                    width: "40%",
                    backgroundColor: "#5EA64A",
                    color: "white"
                  }}
                  value={this.state.phone_type}
                  onChangeText={value => this.setState({ phone_type: value })}
                  data={this.state.dropdowndata}
                />
              </View>
              <View style={{ width: "60%" }}>
                <Input
                  placeholder="Phone"
                  placeholderTextColor="#7777775c"
                  leftIcon={{
                    type: "font-awesome",
                    name: "phone",
                    color: "#5EA64A"
                  }}
                  style={styles.input_style}
                  inputStyle={{ marginLeft: 16 }}
                  inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                  onChangeText={text => this.setState({ phone: text })}
                />
              </View>
            </View>

            <View style={styles.checkcontainer}>
              <CheckBox
                value={this.state.terms}
                onValueChange={val => {
                  this.handleCheckbox(val);
                }}
              />
              <Text
                style={{ color: "#5EA64A", textDecorationLine: "underline" }}
                onPress={() => Linking.openURL("https://google.com")}
              >
                I accept Terms and conditions
              </Text>
            </View>

            <View style={styles.container}>
              <Button
                buttonStyle={styles.button}
                title="Sign Up"
                raised={true}
                onPress={this.SignupApi}
              />
            </View>
            <View style={styles.inputContainer}>
              <Button
                title="Already have an account? Click Here"
                type="clear"
                titleStyle={{ color: "#5EA64A" }}
                onPress={() => this.props.navigation.navigate("Auth")}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={this.state.errortitle}
          message={this.state.errormessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="Ok"
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
      </ImageBackground>
    );
  }
  SignupApi = async () => {
    if (this.state.terms) {
      this.setState({ errormessage: "In progress...." });
      this.setState({ errortitle: "Loading" });
      this.showAlert();
      fetch("http://167.172.245.215/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          confirm_success_url: "/",
          phone: this.state.phone,
          phone_type:
            this.state.phone_type === "Cellphone"
              ? "cell"
              : this.state.phone_type,
          image: this.state.image_base64
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson["status"] == "success") {
            // this.hideAlert();
            this.setState({
              errormessage: "Please check your email to confirm registration"
            });
            this.setState({ errortitle: "Success" });
            this.setState({ signup_success: "true" });
            this.showAlert();
            // Alert.alert("Please check your email to confirm registration")
          } else {
            // this.hideAlert();
            this.setState({
              errormessage: responseJson["errors"].full_messages[0]
            });
            this.setState({ errortitle: "Error" });
            this.showAlert();
            // Alert.alert(responseJson["errors"].full_messages[0])
          }
        })

        .catch(error => {
          console.error(error);
        });
    }
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
  radiocontainer: {
    width: "30%"
  },
  phoneContainer: {
    width: "100%"
  },

  checkcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20
  },

  home_image: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50
  },

  sign_in_page: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50
  },

  button: {
    backgroundColor: "#5EA64A",
    width: 300
  },

  photo_button: {
    backgroundColor: "#5EA64A"
  },

  input_style: {
    marginLeft: 20,
    flex: 1
  },

  inputContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});
