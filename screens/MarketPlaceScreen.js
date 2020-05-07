import { Tab, Tabs } from "native-base";
import React from "react";
import { ActivityIndicator, Alert, AsyncStorage, FlatList, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Button, Icon, SearchBar, Slider } from "react-native-elements";
import ImageSlider from "react-native-image-slider";
import { Dropdown } from "react-native-material-dropdown";
import back from "../assets/images/back.png";
import filterr from "../assets/images/filterr.png";
import { BASE_URL } from "../config/NetworkConstants";

// import MultiSlider from "@ptomasroos/react-native-multi-slider";
export default class MarketPlaceScreen extends React.Component {
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
          images: []
        }
      ],
      group_items: [
        {
          id: "",
          title: "",
          price: "",
          description: "",
          products: [
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
              images: []
            }
          ]
        }
      ],
      backup_data: [],
      backup_data_group: [],
      modalVisible: false,
      filtermodalVisible: false,
      filtertitle: "",
      minvalue: 0,
      maxvalue: 10000,
      category: "Electronics",
      installation: "Yes",
      progress: true,
      categoryid: -1,
      categorydata: [
        {
          value: "Electronics"
        },
        {
          value: "Furniture"
        },
        {
          value: "Mobile"
        }
      ],
      installationdata: [
        {
          value: "Yes"
        },
        {
          value: "No"
        }
      ],
      search: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.renderMyData();
      this.get_group_items();
      this.get_categories_data();
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
    if (this.state.categoryid !== -1 && this.state.maxvalue != -1) {
      var url = BASE_URL + `products?q[category_id]=${this.state.categoryid}&q[min_price]=${this.state.minvalue}&q[max_price]=${this.state.maxvalue}`;
    }
    else if (this.state.categoryid != -1) {
      var url = BASE_URL + `products?q[category_id]=${this.state.categoryid}`;

    }
    else if (this.state.maxvalue != -1) {
      var url = BASE_URL + `products?q[min_price]=${this.state.minvalue}&q[max_price]=${this.state.maxvalue}`;

    }
    else {
      var url = BASE_URL + "products";

    }
    //    url = url.substring(0, url.length - 1);

    // url.searchParams.append(data);

    // var params = [
    //   {
    //     q: {
    //       min_price: this.state.minvalue,
    //       max_price: this.state.maxvalue
    //     }
    //     // ["q[min_price]", this.state.minvalue],
    //     // ["q[max_price]", this.state.maxvalue]
    //   }
    // ];
    // Object.keys(params).forEach(key =>
    //   url.searchParams.append(key, params[key])
    // );

    // url.search = new URLSearchParams(data).toString();
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        uid: await AsyncStorage.getItem("uid"),
        client: await AsyncStorage.getItem("client")
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // this.setState({ name : responseJson["name"] })
        // this.setState({ email : responseJson["email"] })
        this.get_group_items();
        this.setState({
          data: responseJson,
          backup_data: responseJson,
          progress: true
        });
      })
      .catch(error => {
        console.log("bbbbbbbb", error);
      });
  }

  async get_group_items() {
    var url = new URL(BASE_URL + "group_items");
    var params = [
      ["q[price_gteq]", this.state.minvalue],
      ["q[price_lteq]", this.state.maxvalue]
    ];

    url.search = new URLSearchParams(params).toString();

    fetch(url, {
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
        this.setState({
          group_items: responseJson,
          backup_data_group: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async get_categories_data() {
    var url = new URL(BASE_URL + "/products/categories");

    fetch(url, {
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
        let catData = [];
        responseJson.categories.map(cat => {
          catData.push({ value: cat.name, id: cat.id });
        });
        this.setState({
          categorydata: catData
        });
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

  setFilterModalVisible(visible) {
    this.setState({ filtermodalVisible: visible });
  }

  send_enquiry = () => {
    this.setModalVisible(!this.state.modalVisible);
    Alert.alert(
      "Sorry!! Your request cannot be processed right now. Please try again later"
    );
  };

  filter_submit = () => {
    this.setState({ filtermodalVisible: !this.state.filtermodalVisible });
    data = this.state.backup_data;
    data_group = this.state.backup_data_group;
    if (this.state.categoryid === -1) {
      this.state.categoryid = 1;
    }
    this.renderMyData();

    data = data.filter(l => {
      return (
        l.price > this.state.minvalue &&
        l.price < this.state.maxvalue &&
        l.title.toLowerCase().match(this.state.searchText)
      );
    });

    data_group = data_group.filter(l => {
      return (
        l.price > this.state.minvalue &&
        l.price < this.state.maxvalue &&
        l.title.toLowerCase().match(this.state.searchText)
      );
    });

    this.setState({
      data: data,
      data_group: data_group
    });
  };

  updateSearch = search => {
    searchText = search.trim().toLowerCase();
    data = this.state.backup_data;
    data_group = this.state.backup_data_group;

    data = data.filter(l => {
      return l.title.toLowerCase().match(searchText);
    });

    data_group = data_group.filter(l => {
      return l.title.toLowerCase().match(searchText);
    });

    this.setState({
      data: data,
      data_group: data_group
    });

    this.setState({ search });
  };

  add_to_wishlist = async item => {
    fetch(BASE_URL + "favourites/add-to-favourite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": await AsyncStorage.getItem("userToken"),
        Accept: "application/json",
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
        Alert.alert("Product added to favourite list");
      })

      .catch(error => {
        console.error(error);
      });
  };

  onDropdownChanege = (vall, ind) => {
    let data = this.state.categorydata;
    let selectedid = "";
    data.map(val => {
      if (val.value === vall) {
        selectedid = val.id;
      }
    });
    this.setState({ category: vall, categoryid: selectedid });
  };
  getPaymentDone = async (token) => {
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
        if (responseJson.message) {
          Alert.alert(responseJson.message)
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
    // console.log(form);


    this.setState({
      buy_button_disabled: false,
      number: form["values"]["number"],
      cvc: form["values"]["cvc"],
      expiry: form["values"]["expiry"]
    });

  };

  buyNowItem(item) {
    this.selectedItem = item
    this.setModalVisible(true)
  }
  render() {
    return (
      <View style={styles.container}>
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
            <View
              style={{
                marginTop: 40
              }}
            >
              <CreditCardInput requiresPostalCode onChange={this._onCardChange} />
              <View
                style={{
                  margin: 30
                }}
              >
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
                  onPress={this.getCreditCardToken}
                  titleStyle={{ color: "black" }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={this.state.modalVisible}
          visible={this.state.filtermodalVisible}
          onRequestClose={() => { }}
        >
          <View style={styles.filterModal}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#5EA64A"
              }}
            >
              Filters
            </Text>
            <View style={{ marginTop: 40 }}>
              <View style={styles.inputContainer}>
                <Text>Minimum Price: ${this.state.minvalue}</Text>
                <Slider
                  value={this.state.minvalue}
                  onValueChange={value => this.setState({ minvalue: value })}
                  maximumValue={100000}
                  thumbTintColor="#5EA64A"
                  step={1}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text>Maximum Price: ${this.state.maxvalue}</Text>
                <Slider
                  value={this.state.maxvalue}
                  onValueChange={value => this.setState({ maxvalue: value })}
                  maximumValue={10000}
                  thumbTintColor="#5EA64A"
                  step={1}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Category</Text>
                <Dropdown
                  label="Category"
                  itemColor={"white"}
                  selectedItemColor={"white"}
                  containerStyle={{
                    width: "100%",
                    marginBottom: 15
                  }}
                  baseColor={"#5EA64A"}
                  pickerStyle={{
                    width: "90%",
                    backgroundColor: "#5EA64A",
                    color: "white",
                    marginLeft: 5
                  }}
                  value={this.state.category}
                  onChangeText={(value, index, data) =>
                    this.onDropdownChanege(value, index, data)
                  }
                  data={this.state.categorydata}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Installation Required?</Text>
                <Dropdown
                  label=""
                  itemColor={"white"}
                  selectedItemColor={"white"}
                  containerStyle={{
                    width: "100%",
                    marginBottom: 15
                  }}
                  baseColor={"#5EA64A"}
                  pickerStyle={{
                    width: "90%",
                    backgroundColor: "#5EA64A",
                    color: "white",
                    marginLeft: 5
                  }}
                  value={this.state.installation}
                  onChangeText={value => this.setState({ installation: value })}
                  data={this.state.installationdata}
                />
              </View>

              {/* <View style={styles.inputContainer}>
                    <Text>Sort: </Text>
                    <Picker
                      style={{height: 50, width: 200}}
                      prompt="Sort"
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({value: itemValue})
                      }>
                      <Picker.Item label="Newest" value="new" />
                      <Picker.Item label="Price low to high" value="lth" />
                      <Picker.Item label="Price high to low" value="htl" />
                    </Picker>
                  </View> */}
              <View style={styles.inputContainer}>
                <Button
                  title="Apply filters"
                  buttonStyle={{ backgroundColor: "#106304" }}
                  onPress={this.filter_submit}
                />
              </View>
              <View style={styles.inputContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.setFilterModalVisible(!this.state.filtermodalVisible);
                  }}
                  style={{ paddingTop: 20 }}
                >
                  <Text style={{ textAlign: "center" }}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            containerStyle={{ backgroundColor: "#089D37", width: "80%" }}
          />
          <TouchableOpacity
            style={{
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#089D37",
              borderTopColor: "black",
              borderTopWidth: 1,
              borderBottomColor: "black",
              borderBottomWidth: 1
            }}
            onPress={() => this.setFilterModalVisible(true)}
          >
            <Image source={filterr} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          {/* <Button
            title="Filters"
            type="outline"
            raised={true}
            buttonStyle={{ width: "20%" }}
            onPress={() => this.setFilterModalVisible(true)}
            titleStyle={{ color: "#5EA64A" }}
          /> */}
        </View>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "#5EA64A" }}>
          <Tab
            heading="Products"
            activeTextStyle={{ color: "#FFF", fontWeight: "bold" }}
            textStyle={{ color: "#707070", fontSize: 12 }}
            tabStyle={{ backgroundColor: "#FAFAFA" }}
            activeTabStyle={{ backgroundColor: "#5EA64A" }}
          >
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.data}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={post => {
                if (this.state.progress == false) {
                  return (
                    <View style={{ marginTop: 200 }}>
                      <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                  );
                }
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
                      <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>${item.price}</Text>
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
                        <View style={styles.cardFooter}>
                          <View style={styles.socialBarContainer}>
                            <View style={styles.socialBarSection}>
                              <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => {
                                  item.id !== ""
                                    ? this.buyNowItem(item)
                                    : "";
                                }}
                              >
                                <Icon
                                  style={styles.icon}
                                  name="shopping-cart"
                                  color="#64707a"
                                />
                                <Text
                                  style={[styles.socialBarLabel, styles.buyNow]}
                                >
                                  Buy Now
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <Button
                          title="Add to Favourite"
                          type="outline"
                          onPress={() => {
                            item.id !== "" ? this.add_to_wishlist(item) : "";
                          }}
                          buttonStyle={styles.detail_button}
                          titleStyle={styles.detail_button_input}
                        />
                      </View>
                    </View>

                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                          {/* <TouchableOpacity style={styles.socialBarButton} onPress={() => this.setModalVisible(true)}>
                        <Icon style={styles.icon} name="shopping-cart" color='#64707a' />
                        <Text style={[styles.socialBarLabel, styles.buyNow]}>Buy Now</Text>
                      </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>
                    {/* <View style={{paddingBottom: 2, alignItems: 'center'}}>
                      <Button
                        buttonStyle={styles.wishlist_button}
                        titleStyle= {{paddingLeft: 5, fontSize: 10}}
                        onPress={this.add_to_wishlist}
                        icon={
                          <Icon
                            name="md-heart"
                            size={15}
                            color="white"
                            type='ionicon'
                          />
                        }
                        title="Wish list"
                      />
                    </View> */}
                  </View>
                );
              }}
            />
          </Tab>
          <Tab
            heading="Package deals"
            activeTextStyle={{ color: "#FFF", fontWeight: "bold" }}
            textStyle={{ color: "#707070", fontSize: 12 }}
            tabStyle={{ backgroundColor: "#FAFAFA" }}
            activeTabStyle={{ backgroundColor: "#5EA64A" }}
          >
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.group_items}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={post => {
                if (this.state.progress == false) {
                  return (
                    <View style={{ marginTop: 200 }}>
                      <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                  );
                }
                const item = post.item;
                return (
                  <View style={styles.cardGroup}>
                    <ImageSlider
                      style={styles.productImg}
                      images={item.products[0].images}
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
                      <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Button
                          title="More Details"
                          type="outline"
                          onPress={() =>
                            this.props.navigation.navigate("GroupItemDetail", {
                              item: item.products,
                              group_price: item.price
                            })
                          }
                          buttonStyle={styles.detail_button}
                          titleStyle={styles.detail_button_input}
                        />
                        <View style={styles.cardFooter}>
                          <View style={styles.socialBarContainer}>
                            <View style={styles.socialBarSection}>
                              <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => {
                                  item.id !== ""
                                    ? this.setModalVisible(true)
                                    : "";
                                }}
                              >
                                <Icon
                                  style={styles.icon}
                                  name="shopping-cart"
                                  color="#64707a"
                                />
                                <Text
                                  style={[styles.socialBarLabel, styles.buyNow]}
                                >
                                  Buy Now
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <Button
                          title="Add to Favourite"
                          type="outline"
                          onPress={() => {
                            item.id !== "" ? this.add_to_wishlist(item) : "";
                          }}
                          buttonStyle={styles.detail_button}
                          titleStyle={styles.detail_button_input}
                        />
                      </View>
                    </View>

                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                          {/* <TouchableOpacity style={styles.socialBarButton} onPress={() => this.setModalVisible(true)}>
                      <Icon style={styles.icon} name="shopping-cart" color='#64707a' />
                      <Text style={[styles.socialBarLabel, styles.buyNow]}>Buy Now</Text>
                    </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>
                  </View>

                  // <View style={styles.cardGroup}>
                  //   <ImageSlider
                  //     style={styles.productImg}
                  //     images={item.products[0].images}
                  //     customSlide={({ index, item, style, width }) => (
                  //       // It's important to put style here because it's got offset inside
                  //       <View
                  //         key={index}
                  //         style={[
                  //           style,
                  //           {
                  //             width: 200,
                  //             height: 200,
                  //             borderTopLeftRadius: 10,
                  //             borderTopRightRadius: 10,
                  //             backgroundColor: "white"
                  //           }
                  //         ]}
                  //       >
                  //         <Image
                  //           source={{ uri: item }}
                  //           style={{
                  //             width: 200,
                  //             height: 200
                  //           }}
                  //         />
                  //       </View>
                  //     )}
                  //   />
                  //   <View
                  //     style={{
                  //       justifyContent: "center",
                  //       alignItems: "center",
                  //       display: "flex"
                  //     }}
                  //   >
                  //     <Text style={styles.title}>{item.title}</Text>
                  //     <Text style={styles.price}>${item.price}</Text>
                  //     <Button
                  //       title="More Details"
                  //       type="outline"
                  //       onPress={() =>
                  //         this.props.navigation.navigate("GroupItemDetail", {
                  //           item: item.products,
                  //           group_price: item.price
                  //         })
                  //       }
                  //       buttonStyle={styles.detail_button}
                  //       titleStyle={styles.detail_button_input}
                  //     />
                  //   </View>

                  //   <View style={styles.cardFooter}>
                  //     <View style={styles.socialBarContainer}>
                  //       <View style={styles.socialBarSection}>
                  //         <TouchableOpacity
                  //           style={styles.socialBarButton}
                  //           onPress={() => this.setModalVisible(true)}
                  //         >
                  //           <Icon
                  //             style={styles.icon}
                  //             name="shopping-cart"
                  //             color="#64707a"
                  //           />
                  //           <Text
                  //             style={[styles.socialBarLabel, styles.buyNow]}
                  //           >
                  //             Buy Now
                  //           </Text>
                  //         </TouchableOpacity>

                  //         {/* <TouchableOpacity style={styles.socialBarButton} onPress={() => this.setModalVisible(true)}>
                  //       <Icon style={styles.icon} name="shopping-cart" color='#64707a' />
                  //       <Text style={[styles.socialBarLabel, styles.buyNow]}>Buy Now</Text>
                  //     </TouchableOpacity> */}
                  //       </View>
                  //     </View>
                  //   </View>
                  // </View>
                );
              }}
            />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

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
  /******** card **************/
  card: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 5,
    // background color must be set
    marginVertical: 8,
    backgroundColor: "#2a2f32",
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2f32",
    flexBasis: "47%"
  },
  cardGroup: {
    flexBasis: "47%",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 5,
    // background color must be set
    marginVertical: 8,
    backgroundColor: "#2a2f32",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
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
    paddingBottom: 10,
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
    backgroundColor: "#850321",
    padding: 5,
    width: 100,
    marginTop: 10
  },
  productImg: {
    height: 200
  }
});
