import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import MapView from 'react-native-maps'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class Checkpoints extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="CheckPoints" level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <MapView initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}/>
        </ScrollView>
        <Footer goalData={this.props.navigation.state.params.goalData} level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(Checkpoints)
