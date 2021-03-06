import React, { Component } from "react";
import { Alert, AsyncStorage, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Header, Icon, Input } from "react-native-elements";
import { BASE_URL } from "../config/NetworkConstants";


export default class ContactUsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      query: ""
    };
  }

  async componentWillMount() {
    this.setState({ email: await AsyncStorage.getItem("user_email") });
  }

  contactus = async () => {
    fetch(BASE_URL + "contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        email: this.state.email,
        query: this.state.query
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert("Email sent");
      })

      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
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
        <Text style={styles.heading}>Contact Us</Text>
        <View style={styles.paragraph}>
          <Text>Email</Text>
          <Input placeholder="Email" value={this.state.email} editable={false} />
        </View>

        <View style={styles.paragraph}>
          <Text style={{ marginVertical: 10 }}>Enter Your Message</Text>
          {/* <TextInput
            style={{
              borderColor: "grey",
              borderWidth: 1,
              height: 30,
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
            placeholder="Enter your query"
            multiline
            numberOfLines={10}
            onChangeText={text => this.setState({ query: text })}
          /> */}
          <Input
            multiline
            numberOfLines={10}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Enter your message"
          />
        </View>

        <View style={styles.paragraph}>
          <Button
            title="Send"
            buttonStyle={{ backgroundColor: "#089D37" }}
            onPress={this.contactus}
          />
        </View>
      </ScrollView>
    );
  }
}

ContactUsScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="ios-mail" type="ionicon" style={{ fontSize: 20 }} />
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
  }
});
