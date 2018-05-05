import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {  StyleSheet,
          View,
          TextInput,
          Image } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export default class UserInputSection extends Component {
  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image source={this.props.source} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="lightgray"
          autoCorrect={false}
        />
      </View>
    );
  }
}

UserInputSection.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  returnKeyType: PropTypes.string,
};


const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 65,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});
