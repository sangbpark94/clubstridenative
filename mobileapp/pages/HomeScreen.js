import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'

class HomeScreen extends Component {

  render() {
    return (
      <View>
        <Header withLogOutButton/>
        <Text style={{fontSize: 150}}>Test</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('TestPage')}>
          <Text>
            Go to TestPage
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
export default withNavigation(HomeScreen);
