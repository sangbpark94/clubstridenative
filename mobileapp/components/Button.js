import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  View,
} from 'react-native';


const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Button extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Animated.View style={styles.button}>
            <Text style={styles.text}> {this.props.title} </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
