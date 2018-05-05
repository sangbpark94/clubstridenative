import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Text,
  Animated,
  View,
} from 'react-native';


const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Button_Submit extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.button}>
            <Text style={styles.text}>LOGIN</Text>
        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: DEVICE_WIDTH - 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3366',
    height: 40,
    borderRadius: 20,
    zIndex: 100,
  },
  text: {
    color: 'white'
  }
});
