import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, Keyboard, View, StatusBar, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import Background from '../components/Background';
import Logo from '../components/Logo';
import Form from '../components/Form_Signup';
import Register_Subsection from '../components/Register_Subsection';

export default class SignupScreen extends Component {

  render() {
    return (
      <Background>
        <Logo/>
        <Form/>
        <Register_Subsection/>
      </Background>
    );
  }
}
