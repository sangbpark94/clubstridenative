import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

import src from '../images/background_runner.jpg';

export default class Background extends Component {
  render() {
    return (
      <ImageBackground style={styles.background} source={src}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
