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
    Picker,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import {BASE_URL} from "../config/NetworkConstants";
import  moment from 'moment';
import {
    Card,
    ListItem,
    Button,
    Icon,
    Input,
    SearchBar,
    Slider,
    Header
} from "react-native-elements";
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
    CreditCardInput,
    LiteCreditCardInput
} from "react-native-credit-card-input";
import ImageSlider from "react-native-image-slider";
import back from "../assets/images/back.png";

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
                    progressLoading:false,
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

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {

        });
        this.renderMyData();
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }



    async renderMyData() {
        fetch(BASE_URL+"wishlists", {
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
                console.log("ResponseJson:",responseJson);
                if(responseJson==null){
                    Alert.alert("Unable to refresh list");
                    this.setState(
                        {
                            progressLoading:false,
                            addMoreModalVisible:false,
                        })
                }
                 else  if(responseJson.length>0) {
                    this.setState(
                        {
                            progressLoading:false,
                            addMoreModalVisible:false,
                            listData: responseJson,
                        }
                    );
                }
                else if(responseJson.length===0){
                    Alert.alert("You have zero items in wishlist");
                    this.setState(
                        {
                            progressLoading:false,
                            addMoreModalVisible:false,
                            listData: responseJson,
                        })
                }
            })
            .catch(error => {
                Alert.alert("Unable to refresh list");
                this.setState(
                    {
                        progressLoading:false,
                        addMoreModalVisible:false,
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
        this.setState({ addMoreModalVisible: visible, Name:"", Description:"" });
    }

    send_enquiry = () => {
        this.setModalVisible(!this.state.modalVisible);
        Alert.alert(
            "Sorry!! Your request cannot be processed right now. Please try again later"
        );
    };
    remove_from_wishlist = async product_id => {
        console.log("Calling");
        fetch(BASE_URL+"wishlists/"+product_id, {
            method: "DELETE",
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
                console.log("responseJson",responseJson);
                 this.renderMyData();
                Alert.alert("Product removed from wish list");
            })

            .catch(error => {
                console.log("ERROR:",error);
            });
    };

    add_to_favourite = async product_id => {

        this.setState({progressLoading:true})
        fetch(BASE_URL+"wishlists", {
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

                if(responseJson.name!=null){
                     this.renderMyData();
                    this.setState({progressLoading:false,addMoreModalVisible:false})
                   // this.setAddMoreModalVisible(false);
                }
                else{
                    Alert.alert("Request Failed")
                    this.setState({progressLoading:false})
                }
              //  this.renderMyData();
            //    Alert.alert("Product removed from wish list");
            })

            .catch(error => {
                Alert.alert("Request Failed");
                this.setState({progressLoading:false})
                console.log(error);
            });
    };
    addMore = () => {
        this.setState({ addMoreModalVisible: true });
    };

    renderItem=({item})=>{

        return(
            <View style={styles.itemContainer}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
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
                            { moment(item.created_at).format('MMMM Do YY')}
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
                <View style={{marginTop: 200}}>
                    <ActivityIndicator size="large" color="#00ff00"/>
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
                    onRequestClose={() => {}}
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
                                    <Image source={back} style={{ width: 25, height: 25 }}/>
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
                                {this.state.progressLoading===true &&   <ActivityIndicator size="large" color="#00ff00" />}
                                {this.state.progressLoading!==true && <Button
                                    title="Add to Wishlist"
                                    buttonStyle={{ backgroundColor: "#089D37" }}
                                    onPress={this.add_to_favourite}
                                />}
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
                    keyExtractor={item => {

                        return item.id}}
                    data={this.state.listData}
                    renderItem={this.renderItem}/>

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
    },
    itemNameStyle:{
      fontSize:18,
        marginEnd:10,
        fontWeight: "800",
        color:"#FFFFFF",
    },
    descriptionStyle:{
        fontSize:14,
        marginEnd:10,
        fontWeight: "500",
        color:"#FFFFFF",
    },
    nameContainer:{
        flexDirection:"row",
        alignItems:'center',


    },
    itemContainer:{
        width:"80%",
        flexDirection:"row",
        marginStart:"10%",
        marginEnd:"10%",
        paddingBottom:10,
        paddingTop:10,
        paddingStart:10,
        paddingEnd:10,
        borderRadius:12,
        backgroundColor: "#5EA64A",
        minHeight:100,
        marginTop:20,
        },
    deleteItemContainer:{
        width:50,
        justifyContent:"center",
        alignItems:"center"
    }
});
