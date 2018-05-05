import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

import imageSource from '../images/runnerbg.jpg';

export default class Background extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={imageSource}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
  },
});
