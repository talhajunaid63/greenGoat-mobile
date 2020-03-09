import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  AsyncStorage,
  Alert
} from "react-native";

import ReactNativeSettingsPage, {
  SectionRow,
  SwitchRow,
  CheckRow
} from "react-native-settings-page";

import { Icon, Header, Input, Button } from "react-native-elements";
import back from "../assets/images/back.png";

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      switch: false,
      errorModalOpen: false,
      value: 40,
      passwordModal: false,
      new_password: "",
      password_confirmation: ""
    };
  }

  update_password = async () => {
    fetch("http://167.172.245.215/auth/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
        if (responseJson["success"] == true) {
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.passwordModal}
          onRequestClose={() => {}}
        >
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <View
              style={{
                width: "100%",
                height: 70,
                backgroundColor: "#089D37",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingTop: 20,
                marginBottom: 30,
                display: "flex",
                flexDirection: "row"
              }}
            >
              {/* <Icon
                style={{ paddingLeft: 20 }}
                onPress={() => navigation.goBack()}
                name="left"
                color="#FFF"
                size={30}
              /> */}
              <TouchableOpacity
                onPress={() => {
                  this.setState({ passwordModal: false });
                }}
                style={{ width: 25, height: 25 }}
              >
                <Image source={back} style={{ width: 25, height: 25 }}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  color: "white",
                  fontSize: 22,
                  marginLeft: -15
                }}
              >
                Update Password{" "}
              </Text>
              <View>
                <Text></Text>
              </View>
            </View>
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

            {/* <View style={{ alignItems: "center", marginTop: 30 }}>
              <Button
                buttonStyle={styles.buttonContainer}
                title="Update"
                raised={true}
                onPress={this.update_password}
              />
            </View> */}
            <View
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                paddingHorizontal: 30,
                marginTop: 30,
                display: "flex"
              }}
            >
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.update_password}
              >
                <Text style={{ color: "white" }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Header
          backgroundColor={"#089D37"}
          leftComponent={
            <Icon
              name="menu"
              color="#fff"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          centerComponent={{
            text: this.props.navigation.state.routeName,
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <Text style={styles.heading}>Settings</Text>

        <ReactNativeSettingsPage>
          <SectionRow text="Notifications Settings">
            <SwitchRow
              text="Email notifications"
              iconName="envelope-o"
              _value={this.state.switch}
              _onValueChange={() => {
                this.setState({ switch: !this.state.switch });
              }}
            />
            <SwitchRow
              text="App notifications"
              iconName="mobile"
              _color="#000"
              _value={this.state.check}
              _onValueChange={() => {
                this.setState({ check: !this.state.check });
              }}
            />
          </SectionRow>
        </ReactNativeSettingsPage>

        <View
          style={{
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            paddingHorizontal: 30,
            display: "flex"
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.setState({ passwordModal: true });
            }}
          >
            <Text style={{ color: "white" }}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              AsyncStorage.clear();
              this.props.navigation.navigate("Auth");
            }}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>

          {/* <Button
            buttonStyle={{ backgroundColor: "#5EA64A" }}
            titleStyle={{ fontSize: 20 }}
            title="Logout"
            onPress={() => {
              AsyncStorage.clear();
              this.props.navigation.navigate("Auth");
            }}
          /> */}
        </View>
      </ScrollView>
    );
  }
}

SettingsScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="md-settings" type="ionicon" style={{ fontSize: 20 }} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#089D37",
    padding: 20,
    textAlign: "center"
  },

  paragraph: {
    padding: 10,
    fontSize: 20,
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
    backgroundColor: "#089D37"
  }
});
