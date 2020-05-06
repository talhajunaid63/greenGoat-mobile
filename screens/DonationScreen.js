import { Form } from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator, AsyncStorage, ImageBackground, Platform,
  KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import AnimatedMultistep from "react-native-animated-multistep";
import AwesomeAlert from "react-native-awesome-alerts";
import { Button, Icon, Input } from "react-native-elements";
import Select2 from "react-native-select-two";
import { NavigationActions, StackActions } from 'react-navigation';
import { BASE_URL } from "../config/NetworkConstants";
var city_names = [
  "Aberdeen",
  "Abilene",
  "Akron",
  "Albany",
  "Albuquerque",
  "Alexandria",
  "Allentown",
  "Amarillo",
  "Anaheim",
  "Anchorage",
  "Ann Arbor",
  "Antioch",
  "Apple Valley",
  "Appleton",
  "Arlington",
  "Arvada",
  "Asheville",
  "Athens",
  "Atlanta",
  "Atlantic City",
  "Augusta",
  "Aurora",
  "Austin",
  "Bakersfield",
  "Baltimore",
  "Barnstable",
  "Baton Rouge",
  "Beaumont",
  "Bel Air",
  "Bellevue",
  "Berkeley",
  "Bethlehem",
  "Billings",
  "Birmingham",
  "Bloomington",
  "Boise",
  "Boise City",
  "Bonita Springs",
  "Boston",
  "Boulder",
  "Bradenton",
  "Bremerton",
  "Bridgeport",
  "Brighton",
  "Brownsville",
  "Bryan",
  "Buffalo",
  "Burbank",
  "Burlington",
  "Cambridge",
  "Canton",
  "Cape Coral",
  "Carrollton",
  "Cary",
  "Cathedral City",
  "Cedar Rapids",
  "Champaign",
  "Chandler",
  "Charleston",
  "Charlotte",
  "Chattanooga",
  "Chesapeake",
  "Chicago",
  "Chula Vista",
  "Cincinnati",
  "Clarke County",
  "Clarksville",
  "Clearwater",
  "Cleveland",
  "College Station",
  "Colorado Springs",
  "Columbia",
  "Columbus",
  "Concord",
  "Coral Springs",
  "Corona",
  "Corpus Christi",
  "Costa Mesa",
  "Dallas",
  "Daly City",
  "Danbury",
  "Davenport",
  "Davidson County",
  "Dayton",
  "Daytona Beach",
  "Deltona",
  "Denton",
  "Denver",
  "Des Moines",
  "Detroit",
  "Downey",
  "Duluth",
  "Durham",
  "El Monte",
  "El Paso",
  "Elizabeth",
  "Elk Grove",
  "Elkhart",
  "Erie",
  "Escondido",
  "Eugene",
  "Evansville",
  "Fairfield",
  "Fargo",
  "Fayetteville",
  "Fitchburg",
  "Flint",
  "Fontana",
  "Fort Collins",
  "Fort Lauderdale",
  "Fort Smith",
  "Fort Walton Beach",
  "Fort Wayne",
  "Fort Worth",
  "Frederick",
  "Fremont",
  "Fresno",
  "Fullerton",
  "Gainesville",
  "Garden Grove",
  "Garland",
  "Gastonia",
  "Gilbert",
  "Glendale",
  "Grand Prairie",
  "Grand Rapids",
  "Grayslake",
  "Green Bay",
  "GreenBay",
  "Greensboro",
  "Greenville",
  "Gulfport-Biloxi",
  "Hagerstown",
  "Hampton",
  "Harlingen",
  "Harrisburg",
  "Hartford",
  "Havre de Grace",
  "Hayward",
  "Hemet",
  "Henderson",
  "Hesperia",
  "Hialeah",
  "Hickory",
  "High Point",
  "Hollywood",
  "Honolulu",
  "Houma",
  "Houston",
  "Howell",
  "Huntington",
  "Huntington Beach",
  "Huntsville",
  "Independence",
  "Indianapolis",
  "Inglewood",
  "Irvine",
  "Irving",
  "Jackson",
  "Jacksonville",
  "Jefferson",
  "Jersey City",
  "Johnson City",
  "Joliet",
  "Kailua",
  "Kalamazoo",
  "Kaneohe",
  "Kansas City",
  "Kennewick",
  "Kenosha",
  "Killeen",
  "Kissimmee",
  "Knoxville",
  "Lacey",
  "Lafayette",
  "Lake Charles",
  "Lakeland",
  "Lakewood",
  "Lancaster",
  "Lansing",
  "Laredo",
  "Las Cruces",
  "Las Vegas",
  "Layton",
  "Leominster",
  "Lewisville",
  "Lexington",
  "Lincoln",
  "Little Rock",
  "Long Beach",
  "Lorain",
  "Los Angeles",
  "Louisville",
  "Lowell",
  "Lubbock",
  "Macon",
  "Madison",
  "Manchester",
  "Marina",
  "Marysville",
  "McAllen",
  "McHenry",
  "Medford",
  "Melbourne",
  "Memphis",
  "Merced",
  "Mesa",
  "Mesquite",
  "Miami",
  "Milwaukee",
  "Minneapolis",
  "Miramar",
  "Mission Viejo",
  "Mobile",
  "Modesto",
  "Monroe",
  "Monterey",
  "Montgomery",
  "Moreno Valley",
  "Murfreesboro",
  "Murrieta",
  "Muskegon",
  "Myrtle Beach",
  "Naperville",
  "Naples",
  "Nashua",
  "Nashville",
  "New Bedford",
  "New Haven",
  "New London",
  "New Orleans",
  "New York",
  "New York City",
  "Newark",
  "Newburgh",
  "Newport News",
  "Norfolk",
  "Normal",
  "Norman",
  "North Charleston",
  "North Las Vegas",
  "North Port",
  "Norwalk",
  "Norwich",
  "Oakland",
  "Ocala",
  "Oceanside",
  "Odessa",
  "Ogden",
  "Oklahoma City",
  "Olathe",
  "Olympia",
  "Omaha",
  "Ontario",
  "Orange",
  "Orem",
  "Orlando",
  "Overland Park",
  "Oxnard",
  "Palm Bay",
  "Palm Springs",
  "Palmdale",
  "Panama City",
  "Pasadena",
  "Paterson",
  "Pembroke Pines",
  "Pensacola",
  "Peoria",
  "Philadelphia",
  "Phoenix",
  "Pittsburgh",
  "Plano",
  "Pomona",
  "Pompano Beach",
  "Port Arthur",
  "Port Orange",
  "Port Saint Lucie",
  "Port St. Lucie",
  "Portland",
  "Portsmouth",
  "Poughkeepsie",
  "Providence",
  "Provo",
  "Pueblo",
  "Punta Gorda",
  "Racine",
  "Raleigh",
  "Rancho Cucamonga",
  "Reading",
  "Redding",
  "Reno",
  "Richland",
  "Richmond",
  "Richmond County",
  "Riverside",
  "Roanoke",
  "Rochester",
  "Rockford",
  "Roseville",
  "Round Lake Beach",
  "Sacramento",
  "Saginaw",
  "Saint Louis",
  "Saint Paul",
  "Saint Petersburg",
  "Salem",
  "Salinas",
  "Salt Lake City",
  "San Antonio",
  "San Bernardino",
  "San Buenaventura",
  "San Diego",
  "San Francisco",
  "San Jose",
  "Santa Ana",
  "Santa Barbara",
  "Santa Clara",
  "Santa Clarita",
  "Santa Cruz",
  "Santa Maria",
  "Santa Rosa",
  "Sarasota",
  "Savannah",
  "Scottsdale",
  "Scranton",
  "Seaside",
  "Seattle",
  "Sebastian",
  "Shreveport",
  "Simi Valley",
  "Sioux City",
  "Sioux Falls",
  "South Bend",
  "South Lyon",
  "Spartanburg",
  "Spokane",
  "Springdale",
  "Springfield",
  "St. Louis",
  "St. Paul",
  "St. Petersburg",
  "Stamford",
  "Sterling Heights",
  "Stockton",
  "Sunnyvale",
  "Syracuse",
  "Tacoma",
  "Tallahassee",
  "Tampa",
  "Temecula",
  "Tempe",
  "Thornton",
  "Thousand Oaks",
  "Toledo",
  "Topeka",
  "Torrance",
  "Trenton",
  "Tucson",
  "Tulsa",
  "Tuscaloosa",
  "Tyler",
  "Utica",
  "Vallejo",
  "Vancouver",
  "Vero Beach",
  "Victorville",
  "Virginia Beach",
  "Visalia",
  "Waco",
  "Warren",
  "Washington",
  "Waterbury",
  "Waterloo",
  "West Covina",
  "West Valley City",
  "Westminster",
  "Wichita",
  "Wilmington",
  "Winston",
  "Winter Haven",
  "Worcester",
  "Yakima",
  "Yonkers",
  "York",
  "Youngstown"
];
const cityData = [];
var arrayLength = city_names.length;
for (var i = 0; i < arrayLength; i++) {
  cityData[i] = { id: city_names[i], name: city_names[i] };
}

var state_names = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
const stateData = [];
var arrayLength_state = state_names.length;
for (var i = 0; i < arrayLength_state; i++) {
  stateData[i] = { id: state_names[i], name: state_names[i] };
}

const typeData = [
  { id: "gut", name: "Gut Renovation" },
  { id: "full", name: "Complete Demolition" }, // set default checked for render option item
  { id: "kitchen", name: "Kitchen/Bath Renovation" },
  { id: "other", name: "Other" }
];

class step0 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getState } = this.props;
    const state = getState();
    // this.setState({address:state['address']})
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    // saveState({ address: this.state.address });

    // Go to next step
    next();
  };

  render() {
    return (
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            To get an estimate of your materials and their value, we'll use the
            greenGoat database to get you some numbers. Ready?
          </Text>
        </View>

        <View style={styles.stepsbtnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Icon
              raised
              name="arrow-circle-right"
              type="font-awesome"
              color="#0e9c34"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "", error: false };
  }

  componentDidMount() {
    const { getState } = this.props;
    const state = getState();
    this.setState({ address: state["address"] });
  }

  nextStep = () => {
    if (this.state.address) {
      this.setState({ error: false });
    } else {
      return this.setState({ error: true });
    }

    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ address: this.state.address });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    return (
      <View>
        <Text style={styles.donation_form_title}>
          {" "}
          Please enter your project's address {" "}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Input
            placeholder="House number and street"
            placeholderTextColor="#f1f1f1"
            style={styles.input_style}
            inputStyle={{ marginLeft: 5, color: "white" }}
            inputContainerStyle={{
              borderBottomColor: this.state.error == true ? "red" : "#d9d9e0"
            }}
            onChangeText={text => this.setState({ address: text })}
            value={this.state.address}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: "white", textAlign: "center" }}>
            city, state, zip on next page
          </Text>
        </View>

        <View style={styles.stepsbtnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Icon
              raised
              name="arrow-circle-right"
              type="font-awesome"
              color="#0e9c34"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      state: "",
      zip: "",
      error: false,
      loading: false,
      zipError: "",
      iszipError: false,
      showfeilds: false
    };
  }

  componentDidMount() {
    const { getState } = this.props;
    const state = getState();
    this.setState({ city: state["city"], state: state["state"], zip: state["zip"] });
  }

  nextStep = () => {
    if (this.state.city && this.state.state && this.state.zip) {
      this.setState({ error: false });
    } else {
      return this.setState({ error: true });
    }
    const { next, saveState } = this.props;
    saveState({
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    });
    next();
  };

  getCityAndZip = () => {
    // var cities = require("cities");
    // let city = cities.zip_lookup(07946);
    this.setState({ loading: true });
    // alert(city);
    // var cache = {};
    // // var container = $("#example1");
    // // var errorDiv = container.find("div.text-error");
    // var clientKey =
    //   "js-9qZHzu2Flc59Eq5rx10JdKERovBlJp3TQ3ApyC4TOa3tA8U7aVRnFwf41RpLgtE7";
    var url = `http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`;
    // fetch(url, {
    //   method: "GET"
    // })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data[0].City,
          state: data[0].State,
          showfeilds: true,
          iszipError: false,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error:", error);
        this.setState({
          iszipError: true,
          loading: false,
          zipError: "unable to find data please try again"
        });
      });
  };

  render() {
    return (
      <View>
        {this.state.showfeilds && !this.state.iszipError && <Text style={styles.donation_form_title}>
          {" "}
          Please see the information below, proceed if correct{" "}
        </Text>}
        {!this.state.showfeilds && <Text style={styles.donation_form_title}>
          {" "}
          Please enter your Zip Code{" "}
        </Text>}
        <View style={{ marginTop: 20 }}>
          <Input
            placeholder="Zip"
            placeholderTextColor="white"
            style={{ width: "70%" }}
            onSubmitEditing={() => this.getCityAndZip()}
            inputStyle={{ marginLeft: 5, color: "white" }}
            inputContainerStyle={{
              borderBottomColor: this.state.error == true ? "red" : "#d9d9e0"
            }}
            onChangeText={text => this.setState({ zip: text })}
            value={this.state.zip}
          />
          {this.state.loading && (
            <View style={{ marginVertical: 10 }}>
              <ActivityIndicator
                size="large"
                color="#fffff"
                animating={this.state.loading}
              />
            </View>
          )}

          {this.state.iszipError && (
            <Text
              style={{
                color: "red",
                width: "100%",
                textAlign: "center"
              }}
            >
              {this.state.zipError}
            </Text>
          )}
          {this.state.showfeilds && !this.state.iszipError && (
            <View>
              <Input
                placeholder="City"
                placeholderTextColor="white"
                style={{ color: "white" }}
                inputStyle={{ marginLeft: 5, color: "white" }}
                inputContainerStyle={{
                  borderBottomColor:
                    this.state.error == true ? "red" : "#d9d9e0"
                }}
                onChangeText={text => this.setState({ city: text })}
                value={this.state.city}
              />

              <Input
                placeholder="State"
                placeholderTextColor="white"
                style={{ color: "white" }}
                inputStyle={{ marginLeft: 5, color: "white" }}
                inputContainerStyle={{
                  borderBottomColor:
                    this.state.error == true ? "red" : "#d9d9e0"
                }}
                onChangeText={text => this.setState({ state: text })}
                value={this.state.state}
              />
            </View>
          )}
          {/* <Select2
            isSelectSingle
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: "white",
              borderColor: this.state.error == true ? "red" : "#d9d9e0"
            }}
            colorTheme="#5EA64A"
            popupTitle="Select city"
            title="Select city"
            data={cityData}
            selectButtonText="Choose"
            cancelButtonText="Cancel"
            searchPlaceHolderText="Select City"
            listEmptyTitle="No results found"
            selectedTitleStyle={{ color: "white" }}
            onSelect={data => {
              this.setState({ data });
              this.setState({ city: data[0] });
            }}
            onRemoveItem={data => {
              this.setState({ data });
              this.setState({ city: data[0] });
            }}
          /> */}

          {/* <Select2
            isSelectSingle
            style={{
              borderRadius: 5,
              marginTop: 10,
              borderColor: this.state.error == true ? "red" : "#d9d9e0"
            }}
            colorTheme="#5EA64A"
            popupTitle="Select state"
            title="Select state"
            data={stateData}
            selectButtonText="Choose"
            cancelButtonText="Cancel"
            searchPlaceHolderText="Select State"
            listEmptyTitle="No results found"
            selectedTitleStyle={{ color: "white" }}
            onSelect={data => {
              this.setState({ data });
              this.setState({ state: data[0] });
            }}
            onRemoveItem={data => {
              this.setState({ data });
              this.setState({ state: data[0] });
            }}
          /> */}
        </View>
        <View style={styles.stepsbtnContainer}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
            <Icon
              raised
              name="arrow-circle-left"
              type="font-awesome"
              color="#f50"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.state.city === undefined
                ? this.getCityAndZip()
                : this.nextStep();
            }}
            style={styles.btnStyle}
          >
            <Icon
              raised
              name="arrow-circle-right"
              type="font-awesome"
              color="#0e9c34"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class step3 extends Component {
  constructor(props) {
    super(props);

    this.state = { type_of_project: "gut" };
  }

  componentDidMount() {
    const { getState } = this.props;
    const state = getState();
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState({ type: this.state.type_of_project });
    next();
  };

  render() {
    return (
      <View>
        <Text style={styles.donation_form_title}>
          {" "}
          Please select type of your project
        </Text>
        <View>
          {/* <Picker
              style={{height: 50, width: 200}}
              prompt="Please select type of your project"
              selectedValue={this.state.pickerValue || 'gut'}
              onValueChange={(value) => {
                this.setState({pickerValue: value});
                this.setState({type_of_project:value});
              }} itemStyle={{color: 'white'}}>
              <Picker.Item label="Gut reno" value="gut" />
              <Picker.Item label="Full tear down" value="full" />
              <Picker.Item label="Kitchen/Bath renovation" value="kitchen" />
              <Picker.Item label="other" value="other" />
            </Picker> */}

          <Select2
            isSelectSingle
            style={{
              borderRadius: 5,
              marginTop: 10,
              borderColor: this.state.error == true ? "red" : "#d9d9e0"
            }}
            colorTheme="#5EA64A"
            popupTitle="Please select type of your project"
            title="Please select type of your project"
            data={typeData}
            selectButtonText="Choose"
            cancelButtonText="Cancel"
            searchPlaceHolderText="Select"
            showSearchBox={false}
            listEmptyTitle="No results found"
            selectedTitleStyle={{ color: "white" }}
            onSelect={data => {
              this.setState({
                data,
                type_of_project: data[0]
              });
            }}
            onRemoveItem={data => {
              this.setState({
                data,
                type_of_project: data[0]
              });
            }}
          />
        </View>
        <View style={styles.stepsbtnContainer}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
            <Icon
              raised
              name="arrow-circle-left"
              type="font-awesome"
              color="#f50"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Icon
              raised
              name="arrow-circle-right"
              type="font-awesome"
              color="#0e9c34"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class step4 extends Component {
  constructor(props) {
    super(props);

    // this.state = {type_of_project: 'gut'};
  }

  componentDidMount() {
    const { getState } = this.props;
    const state = getState();
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    // saveState({ type: this.state.type_of_project });
    next();
  };

  render() {
    return (
      <View>
        <View style={{ marginTop: 30 }}>
          <Button
            title="Calculate"
            raised={true}
            buttonStyle={styles.submit_button}
            onPress={this.nextStep}
          // onPress={() => this.donationformsubmission()}
          />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: 15
          }}
        >
          <Text style={{ color: "red" }}>This is not an appraisal</Text>
        </View>
        <View style={styles.stepsbtnContainer}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
            <Icon
              raised
              name="arrow-circle-left"
              type="font-awesome"
              color="#f50"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class DonationScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    photo: null,
    address: "",
    city: "",
    state: "",
    zip: "",
    type: "gut",
    errormessage: "",
    errortitle: ""
  };

  allSteps = [

    { name: "step 1", component: step1 },
    { name: "step 2", component: step2 },
    { name: "step 3", component: step3 },
    { name: "step 4", component: step4 }
  ];

  onNext = () => {
    console.log("Next");
  };

  /* define the method to be called when you go on back step */

  onBack = () => {
    console.log("Back");
  };

  finish = state => {
    console.log(state);
    this.setState(
      {
        address: state["address"],
        city: state["city"],
        state: state["state"],
        zip: state["zip"],
        type: state["type"]
      },
      () => {
        this.donationformsubmission();
      }
    );
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  static navigationOptions = {
    headerMode: "none"
  };
  componentDidMount() {
    // this.getPermissionAsync();
  }

  async donationformsubmission() {
    this.setState({ errormessage: "In progress....", errortitle: "Please wait" });
    this.showAlert();
    if (
      this.state.address &&
      this.state.city &&
      this.state.state &&
      this.state.zip &&
      this.state.type
    ) {
      fetch(BASE_URL + "projects/zillow-flow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": await AsyncStorage.getItem("userToken"),
          uid: await AsyncStorage.getItem("uid"),
          client: await AsyncStorage.getItem("client")
        },
        body: JSON.stringify({
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          type_of_project: this.state.type,
          user_id: await AsyncStorage.getItem("user_id")
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            errormessage: responseJson["message"],
            errortitle: "Response"
          });
          this.showAlert();
        })
        .catch(err => {
          this.hideAlert();
        });

      // Alert.alert('Success', 'Please check you email for response. Thankyou !')
    } else {
      // Alert.alert('Error', 'Please fill all fields')
      this.setState({ errormessage: "Please fill all fields", errortitle: "Error" });
      this.showAlert();
    }
  }

  render() {
    const { image } = this.state;
    return (
      <KeyboardAvoidingView {...(Platform.OS === 'ios' && { behavior: 'padding' })} >
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.donation_screen}>
              <View style={styles.donation_form}>
                {/* <Text style={styles.donation_form_title}> Donation Form Query  </Text> */}
                <Form style={{ width: "100%" }}>
                  <View style={{ flex: 1 }}>
                    <AnimatedMultistep
                      steps={this.allSteps}
                      onFinish={this.finish}
                      onBack={this.onBack}
                      onNext={this.onNext}
                      comeInOnNext="bounceInUp"
                      OutOnNext="bounceOutDown"
                      comeInOnBack="bounceInDown"
                      OutOnBack="bounceOutUp"
                    />
                  </View>
                </Form>
              </View>
            </View>
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title={this.state.errortitle}
              message={this.state.errormessage}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={this.state.errortitle === "Response"}
              showConfirmButton={false}
              cancelText="Ok"
              confirmText=""
              confirmButtonColor="#DD6B55"
              overlayStyle={{ backgroundColor: "#0000" }}
              onCancelPressed={() => {
                this.props
                  .navigation
                  .dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'DashboardTabNavigator',
                      }),
                    ],
                  }))
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  donation_screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 30
  },

  donation_form: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    padding: 20,
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(52, 52, 52, 0.5)",
    alignItems: "center",
    width: "80%"
  },

  donation_form_title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    textAlign: "center"
  },

  input_styles: {
    borderColor: "white",
    width: "100%"
  },

  photo_view: {
    marginTop: 20,
    marginBottom: 20
  },
  photo_button: {
    backgroundColor: "#87088d"
  },
  submit_button: {
    backgroundColor: "#5EA64A"
  },
  stepsbtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10%"
  }
});
