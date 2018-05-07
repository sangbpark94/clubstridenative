import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text} from 'react-native';

export default class Register_Subsection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dont have an account?
          <Text style={styles.text, styles.link}> Sign up</Text>
        </Text>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  link: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});
