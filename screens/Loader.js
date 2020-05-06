import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});

class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStartDate: null
    }
  }

  render() {
    return (
      <Modal transparent visible={this.props.LoaderVisibles}>
        <View style={[styles.container, this.props.style]}>
          <ActivityIndicator size='large' color='#00ff00' />
        </View>
      </Modal>
    )
  }
}





export default Loader