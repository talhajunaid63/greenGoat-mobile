import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Modal,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "@expo/vector-icons/Ionicons";
import { Table, Row, Rows } from "react-native-table-component";
import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input";
import ImageSlider from "react-native-image-slider";
import {BASE_URL} from "../config/NetworkConstants";

export default class GroupItemDetailScreen extends React.Component {
  constructor(props) {
    const item = props.navigation.state.params.item;
    const price = props.navigation.state.params.group_price;
    super(props);
    this.state = {
      tableData: [
        ["Dimensions", item.width + "x" + item.height],
        ["Weight", item.weight],
        ["Category", item.category && item.category],
        ["Location", item.location && item.location],
        ["Depth", item.depth],
        ["Serial", item.serial]
      ],
      modalVisible: false,
      number: "",
      expiry: "",
      cvc: "",
      type: "group",
      data: item,
      buy_button_disabled: true,
      price: price
    };
  }

  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart");
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <Icon
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.goBack()}
          name="ios-arrow-back"
          color="#FFF"
          size={30}
        />
      )
    };
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  send_enquiry = async () => {
    // Alert.alert('Sorry!! Your request cannot bbe processed right now. Please try again later')
    fetch(BASE_URL+"checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        number: this.state.number,
        cvc: this.state.cvc,
        expiry: this.state.expiry,
        item_type: this.state.type,
        id: this.state.data.id,
        user_id: await AsyncStorage.getItem("user_id"),
        price: this.state.price,
        name: await AsyncStorage.getItem("user_name")
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson["message"]);
        this.props.navigation.navigate("MarketPlace");
      })

      .catch(error => {
        console.error(error);
      });

    this.setModalVisible(!this.state.modalVisible);
  };

  add_to_wishlist = async () => {
    const item = this.props.navigation.state.params.item;
    fetch(BASE_URL+"wishlists/add-to-wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        user_id: await AsyncStorage.getItem("uid"),
        product_id: item.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        Alert.alert("Product added to wish list");
      })

      .catch(error => {
        console.error(error);
      });
  };

  _onCardChange = form => {
    // console.log(form);
    if (form["valid"] == true) {
      this.setState({ buy_button_disabled: false });
      this.setState({ number: form["values"]["number"] });
      this.setState({ cvc: form["values"]["cvc"] });
      this.setState({ expiry: form["values"]["expiry"] });
    }
  };

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View
              style={{ paddingTop: 22, backgroundColor: "#8deb73", flex: 1 }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Buy Now
              </Text>
              <View style={{ marginTop: 40 }}>
                <CreditCardInput
                  requiresPostalCode
                  onChange={this._onCardChange}
                />
                <View style={{ marginTop: 30 }}>
                  <Button
                    title="Buy"
                    icon={
                      <Icon
                        name="shopping-cart"
                        style={{ marginLeft: 30, marginTop: 10 }}
                        size={17}
                        color="black"
                      />
                    }
                    iconRight
                    buttonStyle={{ backgroundColor: "white" }}
                    onPress={this.send_enquiry}
                    titleStyle={{ color: "black" }}
                  />
                </View>
                <View style={{ marginTop: 30 }}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={{ paddingTop: 20 }}
                  >
                    <Text style={{ textAlign: "center" }}>Go Back</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>

          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={1}
            keyExtractor={item => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={post => {
              const item = post.item;
              const table_data = [
                ["Dimensions", item.width + "x" + item.height],
                ["Weight", item.weight],
                ["Category", item.category],
                ["Location", item.location],
                ["Depth", item.depth],
                ["Serial", item.serial]
              ];
              return (
                <View>
                  <View
                    style={{
                      alignItems: "center",
                      marginHorizontal: 30,
                      marginTop: 20
                    }}
                  >
                    {/* <Image style={styles.productImg} source={{uri: "http://8f9d3d24.ngrok.io/" + item.image}}/> */}
                    <ImageSlider
                      style={styles.productImg}
                      images={item.images}
                      customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View
                          key={index}
                          style={[
                            style,
                            {
                              width: 200,
                              height: 200,
                              borderRadius: 100,
                              backgroundColor: "white"
                            }
                          ]}
                        >
                          <Image
                            source={{ uri: item }}
                            style={{
                              width: 200,
                              height: 200,
                              borderRadius: 100,
                              overflow: "hidden"
                            }}
                          />
                        </View>
                      )}
                    />
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <View style={{ padding: 5, marginTop: 10 }}>
                    <Table
                      borderStyle={{
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: "#5EA64A"
                      }}
                    >
                      <Rows
                        textStyle={{ textAlign: "center", marginVertical: 15 }}
                        data={table_data}
                      />
                    </Table>
                  </View>
                </View>
              );
            }}
          />

          <View style={styles.separator}></View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.price}>Group price: ${this.state.price}</Text>
          </View>

          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.setModalVisible(true)}
            >
              <Text style={styles.shareButtonText}>Buy Group Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  productImg: {
    width: 200,
    height: 200,
    borderRadius: 50,
    backgroundColor: "green"
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold"
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold"
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#696969"
  },
  star: {
    width: 40,
    height: 40
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  starContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginVertical: 20
  },
  contentColors: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#27a517",
    padding: 5
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20
  },
  addToCarContainer: {
    marginHorizontal: 30
  },
  wishlist_button: {
    backgroundColor: "#850321",
    padding: 5,
    width: 100,
    marginTop: 10
  }
});
