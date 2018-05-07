import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, Keyboard, View, StatusBar, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import { LinearGradient } from 'expo';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Form from '../components/Form_Login';
import Register_Subsection from '../components/Register_Subsection';

export default class LoginScreen extends Component {

  render() {
    return (
      <Background>
        <Logo/>
        <Form/>
        <Register_Subsection/>
      </Background>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
   }
});
