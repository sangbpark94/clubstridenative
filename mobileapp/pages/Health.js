import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class Health extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withHomeButton withProfileButton title="Health"level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <Text>Health Page</Text>
        </ScrollView>
        <Footer level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(Health)
