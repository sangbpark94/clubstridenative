import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import * as firebase from "firebase";
import Header from '../components/Header'
import { withNavigation } from 'react-navigation'

class Profile extends Component {

  render() {
    return (
      <View>
        <Header withBackButton withLogOutButton />
        <ScrollView>
          <Text>
            Profile Page
          </Text>
        </ScrollView>
      </View>
    )
  }

}

export default withNavigation(Profile)
