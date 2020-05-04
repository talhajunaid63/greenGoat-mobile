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
  AsyncStorage,
  TouchableHighlightBase
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "@expo/vector-icons/Ionicons";
import {
  Icon as Icon1
} from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input";
import ImageSlider from "react-native-image-slider";
import {BASE_URL} from "../config/NetworkConstants";
import back from "../assets/images/back.png"

export default class ProductDetailScreen extends React.Component {
  constructor(props) {
    const item = props.navigation.state.params.item;
    super(props);
    this.state = {
      imageModal:false,
      tableData: [
        ["Dimensions", item.width + "x" + item.height],
        ["Weight", item.weight],
        ["Category", item.category],
        ["Location", item.location],
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
      price: item.price
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
    fetch(BASE_URL+"favourites/add-to-favourite", {
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
  buyNowItem(item){
    console.log("item:",item)
    this.selectedItem=item
    this.setModalVisible(true)
  }
  getPaymentDone=async (token)=>{

    console.log("Token:",await AsyncStorage.getItem("userToken"));
    console.log("UID:",await AsyncStorage.getItem("uid"));
    console.log("client:",await AsyncStorage.getItem("uid"));
    console.log("Base_url:",BASE_URL+"orders");
    fetch(BASE_URL+"orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      },
      body: JSON.stringify({
            "order": {
              "amount": this.selectedItem.price,
              "token": token,
              "order_type": "item",
              "id": this.selectedItem.id
            }
          }
      )
    })
        .then(response => response.json())
        .then(responseJson => {
          console.log("ResponseJson payment:",responseJson);
          if(responseJson.message){
            Alert.alert(responseJson.message)
          }

        })

        .catch(error => {
          console.log(error);
        });
  };
  getCreditCardToken = () => {
    if(this.state.expiry!=null && this.state.number !=null) {
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
      }).then(response =>response.json()).then((jsonRespone)=>{
        console.log("jsonRespone",jsonRespone)
        if(jsonRespone.id!=null) {
          this.getPaymentDone(jsonRespone.id)
        }
      }).catch((error => {
        console.log("error i  payment:", error)
      }));
    }
  };
  _onCardChange = form => {
    // console.log(form);
    console.log("card form:",form)
     console.log("card valid:",this.state)
    this.setState({ buy_button_disabled: false });
    this.setState({ number: form["values"]["number"] });
    this.setState({ cvc: form["values"]["cvc"] });
    this.setState({ expiry: form["values"]["expiry"] });

  };

  render() {
    const item = this.props.navigation.state.params.item;
    console.log(item);
    return (
      <View style={styles.container}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
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
                        <Icon1
                            name="shopping-cart"
                            style={{ marginLeft: 30, marginTop: 10 }}
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
              onRequestClose={() => {}}
          >
            <View
                style={{ paddingTop: 22, backgroundColor: "#8deb73", flex: 1, justifyContent:"center",alignItems:"center" }}
            >
              <Image
                  style={{width:"90%",height:"auto",aspectRatio:1,marginBottom:20}}
                  source={{uri:this.selectedItem}}
              />
              <Button
                  buttonStyle={styles.button}
                  title= "Go Back"
                  titleStyle={{fontSize: 20}}
                  raised= {true}
                  onPress={() => this.setState({imageModal:false})}
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
                console.log("slider selected item:",item)
                this.selectedItem=item
                return(
                // It's important to put style here because it's got offset inside
                <TouchableOpacity
                    onPress={()=>{this.setState({imageModal:true})}}
                  key={index}
                  style={[
                    style,
                    { width: 200, height: 200, borderRadius: 100 }
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
                </TouchableOpacity>
              )}}
            />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
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
            <Button
              buttonStyle={styles.wishlist_button}
              titleStyle={{ paddingLeft: 5, fontSize: 10 }}
              onPress={this.add_to_wishlist}
              icon={<Icon name="md-heart" size={15} color="white" />}
              title="Favourite"
            />
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
    borderRadius: 10,
    width: 100,
    marginTop: 10
  },
  button: {
    backgroundColor: '#5EA64A',
    width: 300,

  },
});
