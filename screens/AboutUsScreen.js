import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View   } from "react-native";
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
            text: this.props.navigation.state.routeName,
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
            Amy Director of the Company started the non-profit when she was
            working on a kitchen project in my own home and recognized the cost
            and waste of removing and tossing materials in the dumpster and
            purchasing replacement materials. She believed there was a better way
            to redistribute the materials, keeping them out of landfills and into
            the hands of other homeowners who were upcycling and salvaging instead
            of dumping and trashing.
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

      </View>
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
