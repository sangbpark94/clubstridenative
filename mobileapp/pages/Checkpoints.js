import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class Checkpoints extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="CheckPoints" level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <Text>Checkpoints Page</Text>
        </ScrollView>
        <Footer level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(Checkpoints)
