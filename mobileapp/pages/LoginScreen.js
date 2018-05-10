import React, { Component } from 'react';
import { ImageBackground, Animated, StyleSheet, Text, Image, Keyboard, View, StatusBar, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import Dimensions from 'Dimensions';
import icon_user from '../images/icon_user.png';
import icon_password from '../images/icon_password.png';
import { LinearGradient } from 'expo';
import src from '../images/background_runner.jpg';

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
      <ImageBackground style={styles.background} source={src}>
        <LinearGradient colors={['rgba(146, 135, 187, 0.8)', 'rgba(0, 0, 0, 0.6)']}
                        style={{position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0}}/>
        <KeyboardAvoidingView style={styles.container}
                              behavior="padding">
          <StatusBar backgroundColor="transparent"
                     barStyle="light-content"/>

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Club</Text>
            <Text style={styles.logoText}>Stride</Text>
            <Text style={{margin: 4, textAlign: 'center', color: 'red'}}>{this.state.errorCode}</Text>
          </View>

          <View style={styles.inputContainer}>
          {this.state.newUser &&
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
                returnKeyType="next"
                onSubmitEditing={(event) => Keyboard.dismiss()}
               onChangeText = {(text)=>this.name=text}/>
          }
             <View style={styles.inputWrapper}>
               <Image source={icon_user} style={styles.icon} />
               <TextInput
                 style={styles.input}
                 keyboardType='email-address'
                 underlineColorAndroid = "transparent"
                 ref = 'PassInput'
                 returnKeyType="next"
                 placeholder = "Email"
                 placeholderTextColor="lightgray"
                 autoCorrect={false}
                 autoCapitalize = "none"
                 onSubmitEditing={(event) => this.refs.PassInput.focus()}
                 onChangeText = {(text)=>this.email=text}/>
             </View>

           <View style={styles.inputWrapper}>
             <Image source={icon_password} style={styles.icon} />
             <TextInput
               style={styles.input}
               underlineColorAndroid = "transparent"
               ref = 'PassInput'
               returnKeyType="next"
               placeholder = "Password"
               placeholderTextColor="lightgray"
               autoCorrect={false}
               autoCapitalize = "none"
               onSubmitEditing={(event) => Keyboard.dismiss()}
               secureTextEntry
               onChangeText = {(text)=>this.password=text}/>
           </View>
          </View>

          <TouchableOpacity style={styles.buttonContainer}
                            onPress = {() => this.login(this.email, this.password)}>
             <Animated.View style={styles.button}>
                 <Text style={styles.buttonText}> {this.state.newUser? "Register" : "Sign In / Register"} </Text>
             </Animated.View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </ImageBackground>
      )
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex:1,
      padding: 40
   },
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
   inputContainer: {
     flex: 1,
     alignItems: 'center',
   },
   inputWrapper: {
     flex: 1,
   },
   icon: {
     position: 'absolute',
     tintColor: 'white',
     zIndex: 99,
     width: 22,
     height: 22,
     left: 35,
     top: 9,
   },
   buttonContainer: {
     flex: 1,
     alignItems: 'center',
   },
   button: {
     width: DEVICE_WIDTH - 40,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#FF3366',
     height: 40,
     borderRadius: 20,
     zIndex: 100,
   },
   buttonText: {
     color: 'white'
   },
   logoContainer: {
     flex: 3,
     alignItems: 'center',
     justifyContent: 'center',
   },
   logoText: {
     fontSize: 100,
     fontWeight: '900',
     color: 'white',
     fontWeight: 'bold',
     backgroundColor: 'transparent',
     marginTop: 20,
   },
   background: {
     flex: 1,
   },

});
