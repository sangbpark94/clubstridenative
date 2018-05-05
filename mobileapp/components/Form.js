import React, {Component} from 'react';
import { StyleSheet,
         KeyboardAvoidingView,
         View,
         Image } from 'react-native';
import UserInputSection from './UserInputSection';
import icon_user from '../images/icon_user.png';
import icon_password from '../images/icon_password.png';
import Button_Submit from './Button_Submit'

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
        <Button_Submit/>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});
