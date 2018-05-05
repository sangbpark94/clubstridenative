import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class UsePerks extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="Use Perks" level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <Text>UsePerks Page</Text>
        </ScrollView>
        <Footer level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(UsePerks)
