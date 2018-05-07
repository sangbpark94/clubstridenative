import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import { LinearGradient } from 'expo';


import src from '../images/background_runner.jpg';

export default class Background extends Component {
  render() {
    return (
      <ImageBackground style={styles.background} source={src}>
      <LinearGradient
        colors={['rgba(146, 135, 187, 0.8)', 'rgba(0, 0, 0, 0.6)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
      />
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
