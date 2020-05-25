import Icon from "@expo/vector-icons/Ionicons";
import React from "react";
import { Alert, AsyncStorage, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Button, Icon as Icon1 } from "react-native-elements";
import ImageSlider from "react-native-image-slider";
import { Rows, Table } from "react-native-table-component";
import back from "../assets/images/back.png";
import { BASE_URL } from "../config/NetworkConstants";

export default class ProductDetailScreen extends React.Component {
  constructor(props) {
    const item = props.navigation.state.params.item;

    super(props);
    this.state = {
      imageModal: false,
      tableData: [
        ["Dimensions", item.width + "x" + item.height],
        ["Weight", item.weight],
        ["Category", item.category],
        ["Location", item.address],
        ["Depth", item.depth],
        ["Serial", item.serial],
        ["Count", item.count],
        ["Depth", item.depth],
        ["Make", item.make]
      ],
      modalVisible: false,
      number: "",
      expiry: "",
      cvc: "",
      type: "product",
      data: item,
      buy_button_disabled: true,
      price: item.price,
      fav_product_ids: [this.props.navigation.state.params.fav]
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
    fetch(BASE_URL + "checkout", {
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
    fetch(BASE_URL + "favourites/add-to-favourite", {
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

        this.setState({ fav_product_ids: responseJson.product_ids })
        Alert.alert("Product added to Favorite list");
      })

      .catch(error => {
        console.error(error);
      });
  };
  buyNowItem(item) {
    this.item = item
    this.setModalVisible(true)
  }
  getPaymentDone = async (token) => {
    console.log(this.item)
    debugger
    fetch(BASE_URL + "orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        "order": {
          "amount": this.item.adjusted_price != 0 ? this.item.adjusted_price : this.item.asking_price,
          "token": token,
          "order_type": "item",
          "id": this.item.id
        }
      }
      )
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.message) {
          Alert.alert(responseJson.message)
          this.setModalVisible(false)
          this.props.navigation.navigate("MarketPlace")

        }
      })

      .catch(error => {
        console.log(error);
      });
  };
  getCreditCardToken = () => {

    if (this.state.expiry != null && this.state.number != null) {
      let expiry = this.state.expiry.split("/")

      const card = {
        'card[number]': this.state.number,
        'card[exp_month]': expiry[0],
        'card[exp_year]': expiry[1],
        'card[cvc]': this.state.cvc
      };

      let STRIPE_PUBLISHABLE_KEY = 'pk_test_x7BQNZlks7cWynfPFdrXSnDs'
      return fetch('https://api.stripe.com/v1/tokens', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json()).then((jsonRespone) => {
        if (jsonRespone.id != null) {
          this.getPaymentDone(jsonRespone.id)
        }
      }).catch((error => {
        console.log("error i  payment:", error)
      }));
    }
  };
  _onCardChange = form => {
    this.setState({
      buy_button_disabled: false,
      number: form["values"]["number"],
      cvc: form["values"]["cvc"],
      expiry: form["values"]["expiry"]
    });

  };
  async get_fav_product() {
    fetch(BASE_URL + "favourites", {
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

        this.setState(
          {
            fav_product_ids: responseJson["product_ids"],
            wishlist_id: responseJson["id"]
          },
          () => {

          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  remove_from_favroite = async product_id => {

    fetch(BASE_URL + "favourites/remove-from-favourite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
        user_id: await AsyncStorage.getItem("uid"),
        product_id: product_id
      })
    })
      .then(response => response.json())
      .then(async (responseJson) => {

        this.setState({
          fav_product_ids: responseJson.product_id
        })
        Alert.alert("Product removed from wish list");
        await this.renderMyData();
        await this.get_fav_product();
      })

      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const item = this.props.navigation.state.params.item;
    console.log('ssssssss', item)
    const fav = this.state.fav_product_ids && this.state.fav_product_ids.find(element => element == item.id);
    return (
      <View style={styles.container}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { }}
          >

            <View style={{ backgroundColor: "#8deb73", flex: 1 }}>
              <View
                style={{
                  width: "100%",
                  height: 70,
                  backgroundColor: "#089D37",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingTop: 20,
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
                    this.setModalVisible(!this.state.modalVisible);
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
                  Buy Now
                  </Text>
                <View>
                  <Text></Text>
                </View>
              </View>
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
                        name="ios-cart"
                        style={{ marginLeft: 10, marginTop: 8 }}
                        size={17}
                        color="black"
                      />
                    }
                    iconRight
                    buttonStyle={{ backgroundColor: "white" }}
                    onPress={this.getCreditCardToken}
                    titleStyle={{ color: "black" }}
                  />
                </View>

              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.imageModal}
            onRequestClose={() => { }}
          >
            <View
              style={{ paddingTop: 22, backgroundColor: "#8deb73", flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Image
                style={{ width: "90%", height: "auto", aspectRatio: 1, marginBottom: 20 }}
                source={{ uri: this.selectedItem }}
              />
              <Button
                buttonStyle={styles.button}
                title="Go Back"
                titleStyle={{ fontSize: 20 }}
                raised={true}
                onPress={() => this.setState({ imageModal: false })}
              />

            </View>
          </Modal>
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
              customSlide={({ index, item, style, width }) => {
                this.selectedItem = item
                return (
                  // It's important to put style here because it's got offset inside
                  <TouchableOpacity
                    onPress={() => { this.setState({ imageModal: true }) }}
                    key={index}
                    style={[
                      style,
                      { width: 200, height: 200, borderRadius: 10 }
                    ]}
                  >
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        overflow: "hidden"
                      }}
                    />
                  </TouchableOpacity>
                )
              }}
            />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.adjusted_price == 0 ? item.asking_price : item.adjusted_price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.buyNowItem(item)}
            >
              <Text style={styles.shareButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            {fav && fav ?
              <Button
                buttonStyle={styles.wishlist_button_remove}
                titleStyle={{ paddingLeft: 5, fontSize: 10 }}
                onPress={() => this.remove_from_favroite(fav)}
                // icon={<Icon name="md-heart" size={15} color="white" />}
                title="Remove from Favourite"
              />
              :
              <Button
                buttonStyle={styles.wishlist_button}
                titleStyle={{ paddingLeft: 5, fontSize: 10 }}
                onPress={this.add_to_wishlist}
                icon={<Icon name="md-heart" size={15} color="white" />}
                title="Favourite"
              />
            }
          </View>

          <View style={{ padding: 5, marginTop: 10 }}>
            <Table
              style={{ marginHorizontal: 10 }}
              borderStyle={{
                borderWidth: 2,
                borderColor: "#5EA64A"
              }}
            >
              <Rows
                textStyle={{ textAlign: "center", marginVertical: 15 }}
                data={this.state.tableData}
              />
            </Table>
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
    borderRadius: 10,
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
    marginTop: 20
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
    backgroundColor: "#097e9e",
    padding: 5,
    borderRadius: 5,
    width: 100,
    marginTop: 10
  },
  wishlist_button_remove: {
    backgroundColor: "#dc3545",
    padding: 5,
    borderRadius: 10,
    width: 100,
    marginTop: 10
  },
  button: {
    backgroundColor: '#5EA64A',
    width: 300,

  },
});
