import { Icon } from "native-base";
import React from "react";
import { ActivityIndicator, Alert, AsyncStorage, Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { Avatar, Button, Header, Input } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";
import back from "../assets/images/back.png";
import { BASE_URL } from "../config/NetworkConstants";


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: " ",
      lastname: " ",
      email: "",
      image: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      phone_type: "cell",
      dob: "",
      modalVisible: false,
      passwordModal: false,
      new_password: "",
      password_confirmation: "",
      progress: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.renderMyData();
    });
  }

  async  componentWillMount() {
    console.log(await AsyncStorage.getItem("userToken"))
    console.log(await AsyncStorage.getItem("client"))

    this.renderMyData();  
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async renderMyData() {
    fetch(BASE_URL + "myprofile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      }
    })
      .then(response => {

        if (response.status !== 200) {
          response.text().then((res) => {
            console.log(res)
          })

        }
        else {
          response.json()
        }
      }
      )
      .then(responseJson => {
        debugger
        console.log(responseJson, 'essssssssssssssssssssssss')
        this.setState({
          progress: true,
          firstname: responseJson["firstname"],
          lastname: responseJson["lastname"],
          email: responseJson["email"],
          image: responseJson["image"],
          address1: responseJson["address1"],
          address2: responseJson["address2"],
          city: responseJson["city"],
          state: responseJson["state"],
          zip: responseJson["zip"],
          dob: responseJson["dob"],
          phone_type: responseJson["phone_type"], phone: responseJson["phone"].toString()
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  update_user = async () => {
    fetch(BASE_URL + "auth", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json, text/plain',
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        phone: this.state.phone,
        phone_type: this.state.phone_type,
        zip: this.state.zip,
        dob: this.state.dob
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson["status"] == "success") {
          this.setState({ modalVisible: false }, () => {
          });
          this.renderMyData();
        } else {
          Alert.alert(responseJson["errors"].full_messages[0]);
        }
      })

      .catch(error => {
        console.error(error);
      });
  };

  update_password = async () => {
    fetch(BASE_URL + "auth/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json, text/plain',
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        password: this.state.new_password,
        password_confirmation: this.state.password_confirmation
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson["status"] == "success") {
          Alert.alert("Password updated");
          this.setState({ passwordModal: false });
        } else {
          Alert.alert("Error: Password not changed");
        }
      })

      .catch(error => {
        console.error(error);
      });
  };

  renderimage() {
    if (this.state.image) {
      return (
        <Avatar
          rounded
          size="xlarge"
          source={{ uri: BASE_URL + this.state.image }}
        />
      );
    } else {
      name = this.state.firstname + " " + this.state.lastname;
      return <UserAvatar size="130" name={name} />;
    }
  }

  updatePhoneType(type) {
    this.setState({ phone_type: type })
  }
  render() {
    if (this.state.progress == false) {
      return (
        <View style={{ marginTop: 200 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { }}
        >
          <Header
            backgroundColor={"#089D37"}
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
                style={{ width: 25, height: 25 }}
              >
                <Image source={back} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            }

            centerComponent={{
              text: "Update Profile",
              style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
            }}
          />
          {/*<View*/}
          {/*  style={{*/}
          {/*    width: "100%",*/}
          {/*    height: 70,*/}
          {/*    backgroundColor: "#089D37",*/}
          {/*    justifyContent: "space-between",*/}
          {/*    alignItems: "center",*/}
          {/*    paddingHorizontal: 20,*/}
          {/*    paddingTop: 20,*/}
          {/*    display: "flex",*/}
          {/*    flexDirection: "row"*/}
          {/*  }}*/}
          {/*>*/}
          {/*  /!* <Icon*/}
          {/*      style={{ paddingLeft: 20 }}*/}
          {/*      onPress={() => navigation.goBack()}*/}
          {/*      name="left"*/}
          {/*      color="#FFF"*/}
          {/*      size={30}*/}
          {/*    /> *!/*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() => {*/}
          {/*      this.setState({ modalVisible: false });*/}
          {/*    }}*/}
          {/*    style={{ width: 25, height: 25 }}*/}
          {/*  >*/}
          {/*    <Image source={back} style={{ width: 25, height: 25 }}></Image>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      fontWeight: "700",*/}
          {/*      textAlign: "center",*/}
          {/*      color: "white",*/}
          {/*      fontSize: 22,*/}
          {/*      marginLeft: -15*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Update Profile{" "}*/}
          {/*  </Text>*/}
          {/*  <View>*/}
          {/*    <Text></Text>*/}
          {/*  </View>*/}
          {/*</View>*/}
          <ScrollView style={{ paddingVertical: 30 }}>
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
                value={this.state.firstname}
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
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
                value={this.state.lastname}
              />
            </View>

            <View style={styles.phone_outer_container_style}>
              <TouchableOpacity
                onPress={this.updatePhoneType.bind(this, "cell")}
                style={styles.phone_container_style}>
                <View style={[styles.radio_style, { backgroundColor: this.state.phone_type === "cell" ? "#089D37" : "white" }]} />
                <Text style={styles.phone_label_style}>
                  {'Cellphone'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.updatePhoneType.bind(this, "landline")}
                style={styles.phone_container_style}>
                <View style={[styles.radio_style, { backgroundColor: this.state.phone_type === "landline" ? "#089D37" : "white" }]} />
                <Text style={styles.phone_label_style}>
                  {'Landline'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
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
                value={this.state.phone}
              />
            </View>

            {/*<View style={styles.typeContainer}>*/}
            {/*  <Picker*/}
            {/*    style={{ height: 50, width: 200 }}*/}
            {/*    prompt="Phone type"*/}
            {/*    selectedValue={this.state.phone_type}*/}
            {/*    onValueChange={(itemValue, itemIndex) =>*/}
            {/*      this.setState({ phone_type: itemValue })*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <Picker.Item label="Cellphone" value="cell" />*/}
            {/*    <Picker.Item label="Landline" value="landline" />*/}
            {/*  </Picker>*/}
            {/*</View>*/}

            <View style={styles.inputContainer}>
              <Input
                placeholder="Address1"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "address-book",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ address1: text })}
                value={this.state.address1}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Address2"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "address-book",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ address2: text })}
                value={this.state.address2}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="City"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "map-pin",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ city: text })}
                value={this.state.city}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="State"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "home",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ state: text })}
                value={this.state.state}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Zip"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "pencil",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ zip: text })}
                value={this.state.zip}
              />
            </View>

            <View style={styles.inputContainer}>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={date => {
                  this.setState({ dob: date });
                }}
              />
              <Text>{this.state.dob}</Text>
            </View>

            <View style={styles.containerButton}>
              <Button
                buttonStyle={{ backgroundColor: "#089D37" }}
                title="Update"
                raised={true}
                titleStyle={{ color: "black" }}
                onPress={this.update_user}
              />
            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.passwordModal}
          onRequestClose={() => { }}
        >
          <View style={{ backgroundColor: "#8deb73" }}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="New Password"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text => this.setState({ new_password: text })}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="New Password confirmation"
                placeholderTextColor="#7777775c"
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#5EA64A"
                }}
                style={styles.input_style}
                inputStyle={{ marginLeft: 16 }}
                inputContainerStyle={{ borderBottomColor: "#d9d9e0" }}
                onChangeText={text =>
                  this.setState({ password_confirmation: text })
                }
                secureTextEntry={true}
              />
            </View>

            <View style={styles.containerButton}>
              <Button
                buttonStyle={{ backgroundColor: "white" }}
                title="Update"
                raised={true}
                titleStyle={{ color: "black" }}
                onPress={this.update_password}
              />
            </View>
            <View style={{ margin: 30 }}>
              <View>
                <Button
                  buttonStyle={{ backgroundColor: "white" }}
                  title="Go Back"
                  raised={true}
                  titleStyle={{ color: "black" }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <Icon
            name="ios-menu"
            style={{
              fontSize: 25,
              color: "white",
              paddingTop: 40,
              paddingLeft: 10
            }}
            onPress={() => this.props.navigation.openDrawer()}
          />
        </View>
        <View style={styles.avatar}>{this.renderimage()}</View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {this.state.firstname} {this.state.lastname}
            </Text>
            <Text style={styles.info}>{this.state.email}</Text>
            {(this.state.address1 != null || this.state.address2 != null) && <Text style={styles.info}>
              Address: {this.state.address1 ? (this.state.address1 + ",") : ""} {this.state.address2 ? (this.state.address2 + ",") : ""}{" "}
              {this.state.city} {this.state.state} {this.state.zip}{" "}
            </Text>}
            {(this.state.address1 == null && this.state.address2 == null) && <Text style={styles.info}>
              Address: None
              </Text>}

            <View style={{ marginTop: 30 }}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(true);
                }}
                style={styles.buttonContainer}
              >
                <Text style={{ textAlign: "center" }}>Update Information</Text>
              </TouchableHighlight>
            </View>

            {/* <TouchableOpacity style={styles.buttonContainer}
               onPress={() => {
                this.setState({passwordModal: true});
              }}>
                <Text>Change Password</Text>
              </TouchableOpacity>               */}
          </View>
        </View>
        {/*<View style={styles.checkcontainer}>*/}
        {/*    <TouchableOpacity*/}
        {/*        onPress={()=>{this.setState({terms:!this.state.terms})}}*/}
        {/*        style={styles.checkbox_container}>*/}
        {/*        {this.state.terms===true && <Text>*/}
        {/*            {'✓'}*/}
        {/*        </Text>}*/}
        {/*    </TouchableOpacity>*/}

        {/*    <Text*/}
        {/*        style={{ color: "#5EA64A", textDecorationLine: "underline" }}*/}
        {/*        onPress={() => Linking.openURL("https://google.com")}*/}
        {/*    >*/}
        {/*        Enable Email Updates*/}
        {/*    </Text>*/}
        {/*</View>*/}
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="user-circle" type="FontAwesome" style={{ fontSize: 20 }} />
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  containerButton: {
    backgroundColor: "white",
    margin: 50
  },

  header: {
    backgroundColor: "#089D37",
    height: 200
  },
  wishlist_button: {
    backgroundColor: "#850321",
    padding: 5,
    width: 100,
    marginTop: 10
  },
  avatar: {
    width: 130,
    height: 130,
    // borderRadius: 63,
    // borderWidth: 4,
    // borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    // flex: 1,
    alignItems: "center",
    marginTop: 40
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  phone_container_style: {
    flexDirection: "row",
    alignItems: "center",
  },
  phone_outer_container_style: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  radio_style: {
    borderRadius: 25,
    height: 25,
    width: 25,
    borderWidth: 2,
    borderColor: "#089D37"
  },
  phone_label_style: {
    fontSize: 16,
    marginStart: 10,
    color: "black",
  },

  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#089D37"
  },
  productImg: {
    width: 200,
    height: 200
  },
  inputContainer: {
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  typeContainer: {
    marginBottom: 120,
    flexDirection: "row",
    alignItems: "center"
  },
  checkContainer: {
    position: "absolute",
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }
});
