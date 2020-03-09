import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
  DrawerItems
} from "react-navigation-drawer";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { Button, Input } from "react-native-elements";
import { getStatusBarHeight } from "react-native-status-bar-height";
// import Icon from '@expo/vector-icons/Ionicons';

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WishListScreen from "../screens/WishListScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Icon,
  Thumbnail
} from "native-base";

class GetStartedScreen extends React.Component {
  componentWillMount() {
    this.check_if_signed_in();
  }
  static navigationOptions = {
    title: "GetStarted"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.home_image}>
          <Image
            style={{ width: 270, height: 300 }}
            source={require("../assets/images/logo-half.png")}
          />
        </View>

        <View style={styles.container}>
          <Button
            buttonStyle={{ backgroundColor: "#5EA64A", width: 300 }}
            titleStyle={{ fontSize: 30 }}
            title="Get Started"
            raised={true}
            onPress={this.check_if_signed_in}
          />
        </View>
      </ImageBackground>
    );
  }
  check_if_signed_in = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    this.props.navigation.navigate(userToken ? "Main" : "Auth");
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "Main" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

GetStartedScreen.navigationOptions = {
  header: null
};

SignInScreen.navigationOptions = {
  header: null
};

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: MainTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: null
      };
    }
  }
);

DashboardStackNavigator.navigationOptions = {
  drawerIcon: ({ tintColor }) => <Icon name="home" type="FontAwesome" />
};

const CustomDrawer = props => (
  <Container>
    <Header style={{ height: 200, backgroundColor: "#089D37" }}>
      <Body style={styles.drawer_header}>
        <Thumbnail large source={require("../assets/images/logo-half.png")} />
        <Text style={{ color: "white", paddingTop: 10 }}>John Doe</Text>
      </Body>
    </Header>
    <Content>
      <DrawerNavigatorItems {...props} />
    </Content>
  </Container>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: DashboardStackNavigator
    },
    Profile: {
      screen: ProfileScreen
    },
    Wishlist: {
      screen: WishListScreen
    },
    AboutUs: {
      screen: AboutUsScreen
    },
    ContactUs: {
      screen: ContactUsScreen
    },
    Settings: {
      screen: SettingsScreen
    },
    PrivacyPolicy: {
      screen: PrivacyPolicyScreen
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: CustomDrawer,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: AppDrawerNavigator,
      AuthLoading: AuthLoadingScreen,
      Start: GetStartedScreen,
      Auth: SignInScreen,
      SignUp: SignUpScreen
    },
    {
      initialRouteName: "Start",
      headerMode: "none"
    }
  )
);

const styles = StyleSheet.create({
  drawer_header: {
    paddingTop: getStatusBarHeight(),
    flex: 1,
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  home_image: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50
  },

  sign_in_page: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 80
  },

  button: {
    backgroundColor: "#7adb5e",
    width: 300
  },

  input_style: {
    marginLeft: 20,
    flex: 1
  },

  inputContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});
