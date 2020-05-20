import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, Icon } from "react-native-elements";


export default class AboutUsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
            text: "About Us",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <Text style={styles.heading}>About Us</Text>
        <ScrollView>

          <Text style={styles.paragraph}>
            greenGoat saves otherwise discarded building materials and finds new
            projects that need those materials. In so doing, we save the energy
            raw materials, and other natural resources wasted when useful
            materials are tossed away.
        </Text>

          <Text style={styles.paragraph}>
            greenGoat specializes in residential construction, but we save any
          project money by scrutinizing and managing waste streams.{" "}
          </Text>
          <Text style={styles.paragraph}>
            greenGoat also has a staff and rolodex of consultants who are dedicated to the philosophy and forward-thinking economy.
          </Text>
          <Text style={styles.paragraph}>
            Amy Bauman, Director, came from two decades of cost benefit calculations at Fidelity.
            She is an ardent “evolutionary ecologist” who believes solutions can be both financially efficient and environmentally responsible.
        </Text>
          <Text style={styles.paragraph}>
            Alper Caglayan is a serial start-up investor, having founded Open Sesame,
            Peoplestreet, Charles River Analytics, and Milcord.  He resides in Maine.
        </Text>

          <Text style={styles.paragraph}>
            C. Garrett Laws has a wealth of materials experience, having assumed ownership of The Copper & Slate Company in 2009 after more than a decade of construction work.
             Laws always seeks work with durable materials and methods, and he enjoys working with historic structures.
        </Text>

          <Text style={styles.paragraph}>
            Lauren Burchfield approaches greenGoat from a background in non-profit management (from the health sector) and grant administration.
              She has first hand experience with reclaimed materials!
        </Text>

          <Text style={styles.paragraph}>why the greenGoat name and logo? </Text>
          <Text style={styles.paragraph}>
            Well, goats eat pretty much everything, and going green pretty much
          sums up what greenGoat is all about: “saving more than money.”{" "}
          </Text>
          <Text style={styles.paragraph}>
            Where can you find greenGoat? The warehouse is in a beautiful
            turn-of-the-century mill building in Lawrence, MA. It is not a pretty
            retail outlet, it’s a down and dusty warehouse packed with amazing
            finds, every one with its own unique story. To visit this salvage
            nirvana, you need to reach out to me to make an appointment to visit
          for yourself.{" "}
          </Text>
          <Text style={styles.paragraph}>
            Also, you can “like” greenGoat on Facebook or sign up for their email
          blasts to be notified about upcoming demos at thegoat@greengoat.org{" "}
          </Text>
        </ScrollView>

      </View >
    );
  }
}

AboutUsScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="question" type="font-awesome" style={{ fontSize: 20 }} />
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
    fontSize: 20
  }
});
