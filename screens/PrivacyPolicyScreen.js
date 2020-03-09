import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { Icon, Header, Input, Button } from "react-native-elements";

export default class PrivacyPolicyScreen extends Component {
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
        {/* <Text style={styles.heading}>Contact Us</Text>
            <View style={styles.paragraph}>
                <Input
                placeholder='Email'
                />
            </View>
            <View style={styles.paragraph}>
                <Input
                placeholder='Your query'
                />
            </View>    
            
            <View style={styles.paragraph}>
                <Button
                title="Send"
                buttonStyle={{backgroundColor: '#089D37'}}
                />
            </View>     */}
      </ScrollView>
    );
  }
}

PrivacyPolicyScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="ios-paper" type="ionicon" style={{ fontSize: 20 }} />
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
