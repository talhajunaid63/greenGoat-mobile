import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
import ActivityScreen from "../screens/ActivityScreen";
import DonationScreen from "../screens/DonationScreen";
import GroupItemDetailScreen from "../screens/GroupItemDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import MarketPlaceScreen from "../screens/MarketPlaceScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";


const MarketPlaceStack = createStackNavigator(
  {
    MarketPlace: { screen: MarketPlaceScreen },
    ProductDetail: { screen: ProductDetailScreen },
    GroupItemDetail: { screen: GroupItemDetailScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#089D37"
        },
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="bars"
            color="#FFF"
            size={20}
          />
        ),
        headerTitle: "MarketPlace",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          flex: 1
        },
        headerRight: <View style={{ paddingRight: 10 }}></View>
      };
    }
  }
);

const ActivityStack = createStackNavigator(
  {
    Activity: { screen: ActivityScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#089D37"
        },
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="bars"
            color="#FFF"
            size={20}
          />
        ),
        headerTitle: "Activities",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          flex: 1
        },
        headerRight: <View style={{ paddingRight: 10 }}></View>
      };
    }
  }
);

const DonationStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Donation: { screen: DonationScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTransparent: true,
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="bars"
            color="#FFF"
            size={20}
          />
        ),
        headerTitle: "",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          flex: 1
        },
        headerRight: <View style={{ paddingRight: 10 }}></View>
      };
    }
  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: DonationStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon name="wpforms" size={20} color={focused ? "#FFF" : "#115e15"} />
        )
      }
    },
    MarketPlace: {
      screen: MarketPlaceStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="shopping-cart"
            size={20}
            color={focused ? "#FFF" : "#115e15"}
          />
        )
      }
    },
    ActivityPlace: {
      screen: ActivityStack,
      navigationOptions: {
        tabBarLabel: "Activities",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="list-alt"
            size={20}
            color={focused ? "#FFF" : "#115e15"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#115e15",
    barStyle: { backgroundColor: "#5ce06e" }
  }
);

export default TabNavigator;
