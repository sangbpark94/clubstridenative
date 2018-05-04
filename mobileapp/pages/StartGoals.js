import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class StartGoals extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withHomeButton withProfileButton level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <Text>StartGoals Page</Text>
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

export default withNavigation(StartGoals)
