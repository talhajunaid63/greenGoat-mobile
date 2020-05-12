import { Body, Container, Content, Left, List, ListItem, Right, Thumbnail } from "native-base";
import React from "react";
import { ActivityIndicator, AsyncStorage, FlatList, StyleSheet, Text, View } from "react-native";
import { BASE_URL } from "../config/NetworkConstants";

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: "", message: "", created_at: "" }],
      progress: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.renderMyData();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  componentWillMount() {
    this.renderMyData();
  }

  async renderMyData() {
    fetch(BASE_URL + "myactivity", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // this.setState({ name : responseJson["name"] })
        // this.setState({ email : responseJson["email"] })
        this.setState({
          data: responseJson,
          progress: true
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.progress == false) {
      return (
        <View style={{ marginTop: 200 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    image_url =
      "data:image/jpeg;base64,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";
    return (
      <Container>
        <Content>
          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={item => {
              const Notification = item.item;
              return (
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        style={styles.min_size}
                        source={{ uri: image_url }}
                      />
                    </Left>
                    <Body>
                      <Text style={styles.header_name}>Admin</Text>
                      <Text style={styles.min_size} note>
                        {Notification.message}
                      </Text>
                    </Body>
                    <Right>
                      <Text style={styles.min_size} note>
                        {Notification.created_at}
                      </Text>
                    </Right>
                  </ListItem>
                </List>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff"
  },
  separator: {
    marginBottom: 1
  },
  min_size: {
    paddingBottom: 5
  },
  header_name: {
    fontWeight: "bold"
  }
});
