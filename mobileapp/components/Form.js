import React, {Component} from 'react';
import { StyleSheet,
         KeyboardAvoidingView,
         View,
         ActivityIndicator,
         TouchableOpacity,
         Image } from 'react-native';
import UserInputSection from './UserInputSection';
import icon_user from '../images/ic_action_chevron_left.png';
import icon_password from '../images/ic_action_chevron_left.png';

export default class Form extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInputSection
          source={icon_user}
          secureTextEntry={false}
          placeholder="Username"
          returnKeyType={'done'}
        />
        <UserInputSection
          source={icon_password}
          secureTextEntry={true}
          placeholder="Password"
          returnKeyType={'done'}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  }
});
