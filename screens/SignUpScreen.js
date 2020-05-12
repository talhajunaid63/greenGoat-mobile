import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import React from "react";
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import CheckBox from 'react-native-check-box';
import { Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";
import { getStatusBarHeight } from "react-native-status-bar-height";
import land from "../assets/images/land.png";
import phone from "../assets/images/phone.png";
import { BASE_URL } from "../config/NetworkConstants";

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
      isChecked: false,
      phone_type: "Cellphone",
      role: [],
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
      ],
      userTypeDropDown: [
        { value: 'contractor', checked: false, label: 'Contractor' },
        { value: 'appraiser', checked: false, label: 'Appraiser' },
        { value: 'doner', checked: false, label: 'Doner' },
        { value: 'buyer', checked: false, label: 'Buyer' },
        { value: 'real_estate_agent', checked: false, label: 'Real Estate Agent' }


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
  checkboxHandler = (obj, i) => {
    const checkedOptions = this.state.userTypeDropDown;
    checkedOptions[i].checked = !checkedOptions[i].checked
    this.setState({
      userTypeDropDown: [...this.state.userTypeDropDown]
    })
    let rolesArray = this.state.userTypeDropDown.filter((items) => {
      return items.checked === true
    });
    let roles = []
    rolesArray.map((item) => {
      roles.push(item.value)
    })
    this.setState({
      role: roles
    })

  }

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
      this.setState({ image_uri: result.uri, image_base64: result.base64 });
    }
  };
  updateTerms() {

    this.setState({ terms: !this.state.terms })
  }

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


  render() {
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
            <View style={{ width: '100%' }}>
              <Text style={{ marginHorizontal: 15, fontSize: 18 }}>Please Select Type</Text>
              {this.state.userTypeDropDown.map((obj, i) => (
                <View style={styles.checkbox}>
                  <CheckBox
                    // style={{ padding: 10 }}
                    onClick={() => this.checkboxHandler(obj, i)}
                    isChecked={obj.checked}
                    checkBoxColor={"black"}
                    checkedCheckBoxColor={"#5EA64A"}
                  >
                  </CheckBox>
                  <Text style={styles.text}>{obj.label}</Text>
                </View>
              ))}
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
                  resizeMode={"contain"}
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
                  keyboardType='number-pad'
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
              <TouchableOpacity
                onPress={this.updateTerms.bind(this)}
                style={styles.checkbox_container}>
                {this.state.terms === true && <Text>
                  {'✓'}
                </Text>}
              </TouchableOpacity>

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
          showCancelButton={this.state.errortitle !== "Loading"}
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
    const { firstname, lastname, email, password, password_confirmation, phone, role, terms } = this.state
    if (firstname && lastname && email && password && password_confirmation && phone && role) {
      if (terms) {
        if (password === password_confirmation) {
          this.setState({
            errormessage: "In progress....",
            errortitle: "Loading"
          });
          this.showAlert();
          fetch(BASE_URL + "auth", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            },
            body: JSON.stringify({
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
              password: this.state.password,
              password_confirmation: this.state.password_confirmation,
              confirm_success_url: "/",
              phone: this.state.phone,
              role: this.state.role,
              phone_type:
                this.state.phone_type === "Cellphone"
                  ? "cell"
                  : this.state.phone_type,
              image: this.state.image_base64
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              debugger
              if (responseJson["status"] == 'success') {
                // this.hideAlert();
                this.setState({
                  errormessage: "Please check your email to confirm registration",
                  errortitle: "Success",
                  signup_success: "true"
                });

                this.showAlert();
                // Alert.alert("Please check your email to confirm registration")
              } else {
                debugger
                // this.hideAlert();
                this.setState({
                  // errormessage: responseJson["errors"].full_messages[0],
                  errortitle: "Error"
                });
                this.showAlert();
                // Alert.alert(responseJson["errors"].full_messages[0])
              }
            })

            .catch(error => {
              console.error(error);
            });
        }
        else {
          Alert.alert("Password Error", 'Password not Match')
        }
      }
      else {
        Alert, alert('Terms Error', 'Kindly accept terms and condition')
      }

    }
    else {
      Alert.alert("Error", "All Fields are Required")
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
  checkbox_container: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#5EA64A",
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    // alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10
    // paddingVertical: 5,
    // width: '90%'
  },
  text: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 5
  },
});
