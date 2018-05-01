import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'

class HomeScreen extends Component {

  render() {
    return (
      <View>
        <Header withMenuButton/>
        <Text style={{fontSize: 150}}>Test</Text>
      </View>
    )
  }

}
export default withNavigation(HomeScreen);
