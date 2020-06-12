import moment from 'moment';
import React from "react";
import { ActivityIndicator, Alert, AsyncStorage, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Button, Header, Icon, Input } from "react-native-elements";
import Icon1 from 'react-native-vector-icons/AntDesign';
import back from "../assets/images/back.png";
import { BASE_URL } from "../config/NetworkConstants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default class RequestItemScreen extends React.Component {
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
                    images: "",
                    progressLoading: false,
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
            progress: true,
            search: ""
        };
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {

        });
        this.renderMyData();
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }



    async renderMyData() {
        fetch(BASE_URL + "wishlists", {
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
                if (responseJson == null) {
                    Alert.alert("Unable to refresh list");
                    this.setState(
                        {
                            progressLoading: false,
                            addMoreModalVisible: false,
                        })
                }
                else if (responseJson.length > 0) {
                    this.setState(
                        {
                            progressLoading: false,
                            addMoreModalVisible: false,
                            listData: responseJson,
                        }
                    );
                }
                else if (responseJson.length === 0) {
                    // Alert.alert("You have zero items in wishlist");
                    this.setState(
                        {
                            progressLoading: false,
                            addMoreModalVisible: false,
                            listData: responseJson,
                        })
                }
            })
            .catch(error => {
                Alert.alert("Unable to refresh list");
                this.setState(
                    {
                        progressLoading: false,
                        addMoreModalVisible: false,
                    })

            });
    }

    addProductToCart = () => {
        Alert.alert("Success", "The product has been added to your cart");
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setAddMoreModalVisible(visible) {
        this.setState({ addMoreModalVisible: visible, Name: "", Description: "" });
    }

    send_enquiry = () => {
        this.setModalVisible(!this.state.modalVisible);
        Alert.alert(
            "Sorry!! Your request cannot be processed right now. Please try again later"
        );
    };
    remove_from_wishlist = async product_id => {

        let confirm = false;
        if (confirm) {
        }
        else {
            Alert.alert(
                'Remove',
                'Remove item from list?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: async () => {
                            try {
                                fetch(BASE_URL + "wishlists/" + product_id, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "access-token": await AsyncStorage.getItem("userToken"),
                                        uid: await AsyncStorage.getItem("uid"),
                                        client: await AsyncStorage.getItem("client")
                                    },
                                    // body: JSON.stringify({
                                    //     user_id: await AsyncStorage.getItem("uid"),
                                    //     product_id: product_id
                                    // })
                                })
                                    .then(response => response.json())
                                    .then(responseJson => {
                                        console.log(responseJson)
                                        // Alert.alert("Product removed from wish list");
                                        this.renderMyData();

                                    })

                                    .catch(error => {
                                        console.log("ERROR:", error);
                                    });
                            }
                            catch (err) {
                                Alert.alert('oops', err)
                            }
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    };

    add_to_favourite = async product_id => {
        if (this.state.Name != "" && this.state.Description != "") {


            this.setState({ progressLoading: true })
            fetch(BASE_URL + "wishlists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": await AsyncStorage.getItem("userToken"),
                    uid: await AsyncStorage.getItem("uid"),
                    client: await AsyncStorage.getItem("client")
                },
                body: JSON.stringify({
                    name: this.state.Name,
                    description: this.state.Description
                })
            })
                .then(response => response.json())
                .then(responseJson => {

                    if (responseJson.name != null) {
                        this.renderMyData();
                        this.setState({
                            progressLoading: false, addMoreModalVisible: false,
                            Name: '', Description: ''
                        })
                        // this.setAddMoreModalVisible(false);
                    }
                    else {
                        Alert.alert("Request Failed")
                        this.setState({ progressLoading: false })
                    }
                    //  this.renderMyData();
                    //    Alert.alert("Product removed from wish list");
                })

                .catch(error => {
                    Alert.alert("Request Failed");
                    this.setState({ progressLoading: false })
                });
        }
        else {
            Alert.alert("Field Error", "All Field are Required")
        }

    };
    addMore = () => {
        this.setState({ addMoreModalVisible: true });
    };

    renderItem = ({ item }) => {

        return (
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.itemNameStyle}>
                                {"Name :"}
                            </Text>
                            <Text style={styles.itemNameStyle}>
                                {item.name}
                            </Text>
                        </View>

                        <Text style={styles.descriptionStyle}>
                            {item.description}
                        </Text>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.itemNameStyle}>
                            {"Date :"}
                        </Text>
                        <Text style={styles.itemNameStyle}>
                            {moment(item.created_at).format('MMMM Do YY')}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.remove_from_wishlist(item.id)}
                    style={styles.deleteIconContainer}>
                    <Icon1 name={"delete"} size={30} color="#900" />
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        if (this.state.progress == false) {
            return (
                <View style={{ marginTop: 200 }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            );
        }
        // } else if (Object.keys(this.state.data).length == 0) {
        //     return (
        //         <Header
        //             backgroundColor={"#089D37"}
        //             leftComponent={
        //                 <Icon
        //                     name="menu"
        //                     color="#fff"
        //                     onPress={() => this.props.navigation.openDrawer()}
        //                 />
        //             }
        //             centerComponent={{
        //                 text: "Wish list",
        //                 style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
        //             }}
        //         />
        //     );
        // }
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
                    rightComponent={
                        <Icon name="add" color="#fff" onPress={() => this.addMore()} />
                    }
                    centerComponent={{
                        text: "Wishlist",
                        style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
                    }}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.addMoreModalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={{ backgroundColor: "white", flex: 1 }}>

                        <Header
                            backgroundColor={"#089D37"}
                            leftComponent={
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setAddMoreModalVisible(!this.state.addMoreModalVisible);
                                    }}
                                    style={{ width: 25, height: 25 }}
                                >
                                    <Image source={back} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                            }

                            centerComponent={{
                                text: "Add To Wishlist",
                                style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
                            }}
                        />
                        {/*          <View*/}
                        {/*              style={{*/}
                        {/*                  width: "100%",*/}
                        {/*                  height: 70,*/}
                        {/*                  backgroundColor: "#089D37",*/}
                        {/*                  justifyContent: "space-between",*/}
                        {/*                  alignItems: "center",*/}
                        {/*                  paddingHorizontal: 20,*/}
                        {/*                  paddingTop: 20,*/}
                        {/*                  display: "flex",*/}
                        {/*                  flexDirection: "row"*/}
                        {/*              }}*/}
                        {/*          >*/}
                        {/*              /!* <Icon*/}
                        {/*  style={{ paddingLeft: 20 }}*/}
                        {/*  onPress={() => navigation.goBack()}*/}
                        {/*  name="left"*/}
                        {/*  color="#FFF"*/}
                        {/*  size={30}*/}
                        {/*/> *!/*/}


                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => {*/}
                        {/*        this.setAddMoreModalVisible(!this.state.addMoreModalVisible);*/}
                        {/*    }}*/}
                        {/*    style={{ width: 25, height: 25 }}*/}
                        {/*>*/}
                        {/*    <Image source={back} style={{ width: 25, height: 25 }}></Image>*/}
                        {/*</TouchableOpacity>*/}
                        {/*              <Text*/}
                        {/*                  style={{*/}
                        {/*                      fontWeight: "700",*/}
                        {/*                      textAlign: "center",*/}
                        {/*                      color: "white",*/}
                        {/*                      fontSize: 22,*/}
                        {/*                      marginLeft: -15*/}
                        {/*                  }}*/}
                        {/*              >*/}
                        {/*                  Add To Wishlist*/}
                        {/*              </Text>*/}
                        {/*              <View>*/}
                        {/*                  <Text></Text>*/}
                        {/*              </View>*/}
                        {/*          </View>*/}
                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            extraHeight={-180}
                            extraScrollHeight={-180}
                        >
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
                                    <Text>Description</Text>
                                    <Input
                                        onChangeText={text => this.setState({ Description: text })}
                                        placeholder="Description"
                                        value={this.state.Description}
                                    />
                                </View>
                                <View style={styles.paragraph}>
                                    {this.state.progressLoading === true && <ActivityIndicator size="large" color="#00ff00" />}
                                    {this.state.progressLoading !== true && <Button
                                        title="Add to Wishlist"
                                        buttonStyle={{ backgroundColor: "#089D37" }}
                                        onPress={this.add_to_favourite}
                                    />}
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </Modal>

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
                            <CreditCardInput onChange={this._onChange} />
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
                    keyExtractor={item => {

                        return item.id
                    }}
                    data={this.state.listData}
                    ListEmptyComponent={() => {
                        return (<View style={styles.emptyContainer} >
                            <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 20, marginTop: 20 }}>
                                There are no items
                                </Text>
                        </View>
                        )

                    }}
                    renderItem={this.renderItem} />

            </View>
        );
    }
}
RequestItemScreen.navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon1 name="plussquareo" type="font-awesome" style={{ fontSize: 20 }} />
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
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    /******** card **************/
    card: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        // shadowOffset: { width: 100, height: 100 },
        // shadowColor: "black",
        // shadowOpacity: 5,
        // elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        // background color must be set
        marginVertical: 8,
        backgroundColor: "#2a2f32",
        flexBasis: "55%",
        marginHorizontal: 5,
        // borderRadius: 8,
        shadowOpacity: 1.0, borderColor: "#2a2f32"
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
    },
    itemNameStyle: {
        fontSize: 18,
        marginEnd: 10,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    descriptionStyle: {
        fontSize: 14,
        marginEnd: 10,
        fontWeight: "500",
        color: "#FFFFFF",
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: 'center',


    },
    itemContainer: {
        width: "80%",
        flexDirection: "row",
        marginStart: "10%",
        marginEnd: "10%",
        paddingBottom: 10,
        paddingTop: 10,
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        backgroundColor: "#5EA64A",
        minHeight: 100,
        marginTop: 20,
    },
    deleteItemContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});
