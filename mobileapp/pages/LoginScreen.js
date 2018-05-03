import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, Keyboard, View, StatusBar, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";


export default class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      errorCode: ''
    }
  }

  _registerUser(){
     let replaced = this.name.split(' ').join('');
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

   login = (email, pass) => {
    this.setState({errorCode: ""})
     if (this.state.newUser){
      this._registerUser()
    }else{
     firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
       if (error.code == "auth/user-not-found"){
         console.log("User Doesn't Exist - Requesting Name")
         this.setState({newUser: true})
       }else{
         this.setState({errorCode: error.message})
       }
     });
   }
 }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={180}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
        />
            <Text style={{fontSize: 100, fontWeight: '900', textAlign: 'center', color: 'white'}}>
              Club
            </Text>
            <Text style={{marginTop: -20, fontSize: 100, fontWeight: '900', textAlign: 'center', color: 'white'}}>
              Stride
            </Text>
            <Text style={{margin: 4, textAlign: 'center', color: 'red'}}>{this.state.errorCode}</Text>
          {this.state.newUser &&
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
                returnKeyType="next"
                onSubmitEditing={(event) => Keyboard.dismiss()}
               onChangeText = {(text)=>this.name=text}/>
          }
          <View style = {styles.login_row}>
            <TextInput style = {[styles.login_input]}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#cccccc"
                returnKeyType="next"
                 keyboardType='email-address'
               autoCapitalize = "none"
               onSubmitEditing={(event) => this.refs.PassInput.focus()}
               onChangeText = {(text)=>this.email=text}
            />
          </View>
          <View style = {styles.login_row}>
            <TextInput style = {[styles.login_input]}
              underlineColorAndroid = "transparent"
              placeholder = "Password"
              placeholderTextColor = "#cccccc"
               ref = 'PassInput'
               returnKeyType="next"
              autoCapitalize = "none"
               onSubmitEditing={(event) => Keyboard.dismiss()}
              secureTextEntry
              onChangeText = {(text)=>this.password=text}
            />
          </View>


            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.email, this.password)
               }>
               <Text style = {styles.submitButtonText}> {this.state.newUser? "Register" : "Sign In / Register"} </Text>
            </TouchableOpacity>
         </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      // ...Platform.select({
      //   ios: {
      //     fontFamily: 'Helvetica'
      //   },
      //   android: {
      //     fontFamily: 'sans-serif'
      //   }
      // }),
      alignItems: 'center',
      justifyContent: 'center',
      flex:1,
      backgroundColor: '#222',
      padding: 40
   },
   login_row: {
     height:40,
     borderBottomWidth: 1,
     borderBottomColor: 'rgba(255, 255, 255, 0.2)',
     borderStyle: 'solid',
     paddingTop: 10,
     width:'100%'
   },
   login_input: {
     paddingLeft: 20,
     fontSize: 18,
     backgroundColor: 'transparent',
     color: '#CAC9CA'
   },
   submitButton: {
      backgroundColor: 'red',
      padding: 10,
      margin: 4,
      width: '100%'
   },
   submitButtonText:{
      textAlign: 'center',
      color: 'white'
   }
});
