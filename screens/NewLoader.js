
import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { StyleSheet, Platform } from "react-native";

const Loader = (props) => {
    console.log("Loader Props:",props)
    console.log("i am calling")
    if(props.LoaderVisibles) {

        return (

            <View style={[styles.container, props.style]}>
                <ActivityIndicator size='large' color='#00ff00'/>
            </View>


        )
    }
    else {
        return null
    }
}

export default Loader
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height:"100%",
        width:"100%",
        position:"absolute",
        top:0,
        zIndex:1,
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,0.5)"
    }
});

// class Loader extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedStartDate: null
//     }
//   }
//
//   render() {
//     console.log("Loader render:",this.props)
//     return (
//
//     )
//   }
// }





// export default Loader
