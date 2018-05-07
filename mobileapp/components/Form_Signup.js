import React, {Component} from 'react';
import { StyleSheet,
         KeyboardAvoidingView,
         View,
         Alert,
         Image } from 'react-native';
import UserInputSection from './UserInputSection';
import icon_user from '../images/icon_user.png';
import icon_email from '../images/icon_email.png';
import icon_password from '../images/icon_password.png';
import Button from './Button';

export default class Form_Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      username: '',
      name: '',
      password: ''
    }
  }
  _registerUser(){
     let replaced = this.username.split(' ').join('');
     if (replaced!=""){
       firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
         this.props.updateName(this.name)
         console.log("Created New User")
       }).catch(error => {
         this.setState({errorCode: error.message})
       });
     }else{
       this.setState({errorCode: "Name cannot be empty."})
     }
   }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInputSection
          source={icon_email}
          secureTextEntry={false}
          placeholder="email"
          returnKeyType={'done'}
          onChangeText = {(email)=>this.setState({email})}
        />
        <UserInputSection
          source={icon_user}
          secureTextEntry={false}
          placeholder="Username"
          returnKeyType={'done'}
          onChangeText = {(username)=>this.setState({username})}
        />
        <UserInputSection
          source={icon_password}
          secureTextEntry={true}
          placeholder="Password"
          returnKeyType={'done'}
          onChangeText = {(password)=>this.setState({password})}
        />
        <Button title={'Register'}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
