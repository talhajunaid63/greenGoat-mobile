import React from "react";
import { ActivityIndicator, Alert, AsyncStorage, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Button, Header, Icon, Input } from "react-native-elements";
import ImageSlider from "react-native-image-slider";
import back from "../assets/images/back.png";
import { BASE_URL } from "../config/NetworkConstants";

export default class WishListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "",
          title: "",
          price: "",
          category: "",
          need_uninstallation: "",
          location: "",
          appraised_value: "",
          description: "",
          width: "",
          height: "",
          depth: "",
          weight: "",
          uom: "",
          serial: "",
          images: ""
        }
      ],
      wishlist_id: "",
      backup_data: [],
      Name: "",
      Description: "",
      Dimentions: "",
      modalVisible: false,
      addMoreModalVisible: false,
      filtermodalVisible: false,
      minvalue: 0,
      maxvalue: 100000,
      progress: false,
      search: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {

    });
      this.renderMyData();
  }



  async renderMyData() {
    fetch(BASE_URL+"favourites", {
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
            data: responseJson["products"],
            backup_data: responseJson["products"],
            wishlist_id: responseJson["id"],
            progress: true
          },
          () => {

          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  addProductToCart = () => {
    Alert.alert("Success", "The product has been added to your cart");
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setAddMoreModalVisible(visible) {
    this.setState({ addMoreModalVisible: visible });
  }

  send_enquiry = () => {
    this.setModalVisible(!this.state.modalVisible);
    Alert.alert(
      "Sorry!! Your request cannot be processed right now. Please try again later"
    );
  };

  remove_from_wishlist = async product_id => {
    fetch(BASE_URL+"favourites/remove-from-favourite", {
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
      .then(responseJson => {

        this.renderMyData();
        Alert.alert("Product removed from wish list");
      })

      .catch(error => {
        console.log(error);
      });
  };

  addMore = () => {
    this.setState({ addMoreModalVisible: true });
  };
  render() {
    if (this.state.progress == false) {
      return (
        <View style={{ marginTop: 200 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else if (Object.keys(this.state.data).length == 0) {
      return (
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
            text: "Favourite",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
        />
      );
    }
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
          // rightComponent={
          //   <Icon name="add" color="#fff" onPress={() => this.addMore()} />
          // }
          centerComponent={{
            text: "Favourite",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.addMoreModalVisible}
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
                  this.setAddMoreModalVisible(!this.state.addMoreModalVisible);
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
                Add To Favourite
              </Text>
              <View>
                <Text></Text>
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <View style={styles.paragraph}>
                <Text>Name</Text>
                <Input
                  onChangeText={text => this.setState({ Name: text })}
                  placeholder="Name"
                  value={this.state.Name}
                />
              </View>
              <View style={styles.paragraph}>
                <Text>Dimentions</Text>
                <Input
                  placeholder="Dimentions"
                  onChangeText={text => this.setState({ Dimentions: text })}
                  value={this.state.Dimentions}
                />
              </View>
              <View style={styles.paragraph}>
                <Text>Description</Text>
                <Input
                  onChangeText={text => this.setState({ Description: text })}
                  placeholder="Description"
                  value={this.state.Description}
                />
              </View>
              <View style={styles.paragraph}>
                <Button
                  title="Add to Wishlist"
                  buttonStyle={{ backgroundColor: "#089D37" }}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </Modal>

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
              <CreditCardInput requiresPostalCode onChange={this._onChange} />
              <View style={{ margin: 30 }}>
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
            </View>
          </View>
        </Modal>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          ListEmptyComponent={() => {
              return( <View style={styles.emptyContainer} >
                      <Text style={{fontSize:20, fontWeight:"bold", paddingHorizontal:20, marginTop:20}}>
                          There are no favourite items
                      </Text>
                  </View>
              )

          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            return (
              <View style={styles.card}>
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
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          backgroundColor: "white"
                        }
                      ]}
                    >
                      <Image
                        source={{ uri: item }}
                        style={{
                          width: 200,
                          height: 200
                        }}
                      />
                    </View>
                  )}
                />
                <View style={styles.cardHeader}>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <Button
                      title="More Details"
                      type="outline"
                      onPress={() =>
                        this.props.navigation.navigate("ProductDetail", {
                          item: item
                        })
                      }
                      buttonStyle={styles.detail_button}
                      titleStyle={styles.detail_button_input}
                    />
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity
                        style={styles.socialBarButton}
                        onPress={() => this.setModalVisible(true)}
                      >
                        <Icon
                          style={styles.icon}
                          name="shopping-cart"
                          color="#64707a"
                        />
                        <Text style={[styles.socialBarLabel, styles.buyNow]}>
                          Buy Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    paddingBottom: 2,
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <Button
                    buttonStyle={styles.wishlist_button}
                    titleStyle={{ paddingLeft: 5, fontSize: 10 }}
                    onPress={() => this.remove_from_wishlist(item.id)}
                    icon={
                      <Icon
                        name="md-heart"
                        size={15}
                        color="white"
                        type="ionicon"
                      />
                    }
                    title="Remove from Favourite"
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
WishListScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="heart" type="font-awesome" style={{ fontSize: 20 }} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "white"
  },
  listContainer: {
    alignItems: "center"
  },
  separator: {
    marginTop: 10
  },
    emptyContainer:{
        justifyContent:"center",
        alignItems:"center",
    },
  /******** card **************/
  card: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    // background color must be set
    marginVertical: 8,
    backgroundColor: "#2a2f32",
    flexBasis: "55%",
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2f32"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    color: "#b9bcbf"
  },
  price: {
    fontSize: 16,
    color: "#3fd529",
    marginTop: 5
  },
  buyNow: {
    color: "#6cdaf8"
  },
  icon: {
    width: 25,
    height: 25
  },
  detail_button: {
    padding: 5,
    marginTop: 5,
    width: 150,
    borderColor: "#b9bcbf"
  },
  detail_button_input: {
    color: "#b9bcbf"
  },

  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  filterModal: {
    marginTop: 100,
    height: 500,
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  wishlist_button: {
    backgroundColor: "#5EA64A",
    padding: 5,
    width: 150,
    marginVertical: 10
  },
  productImg: {
    height: 200
  },
  paragraph: {
    padding: 10,
    fontSize: 20,
    justifyContent: "center"
  }
});
