import React, {Component} from 'react';
import { StyleSheet,
         KeyboardAvoidingView,
         View,
         Alert,
         TouchableOpacity,
         Image } from 'react-native';
import UserInputSection from './UserInputSection';
import icon_user from '../images/icon_user.png';
import icon_password from '../images/icon_password.png';
import Button from './Button';

export default class Form_Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      errorCode: ''
    }
  }
  login = (email, pass) => {
    this.setState({errorCode: ""});
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
      if (error.code == "auth/user-not-found"){
        console.log("User Doesn't Exist - Requesting Name")
        this.setState({newUser: true})
      }else{
        this.setState({errorCode: error.message})
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInputSection
          source={icon_user}
          secureTextEntry={false}
          placeholder="Username"
          returnKeyType={'done'}
          onChangeText = {(text)=>this.email=text}
        />
        <UserInputSection
          source={icon_password}
          secureTextEntry={true}
          placeholder="Password"
          returnKeyType={'done'}
          onSubmitEditing={(event) => Keyboard.dismiss()}
          onChangeText = {(text)=>this.password=text}
        />
        <Button title={'Log In'}
                onPress = {() => this.login(this.email, this.password)}/>
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
