import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class UsePerks extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="Use Perks" level={this.props.navigation.state.params.level}/>
        <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
          <Text style={{marginTop: 30, fontSize: 36, color: 'white', textAlign: 'center'}}>Your Perks:</Text>
          <TouchableOpacity style={{flex: 1, borderColor: '#0f5623', borderWidth: 5, borderRadius: 5, justifyContent: 'center', marginTop: 30, width: '100%', alignItems: 'center', height: 125, backgroundColor: 'green'}}>
            <Text style={{width: 280, textAlign: 'center', fontWeight: '700', fontSize: 36}}>Starbucks Coffee 2 use(s)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderColor: 'orange', borderWidth: 5, borderRadius: 5, justifyContent: 'center', marginTop: 20, width: '100%', alignItems: 'center', height: 125, backgroundColor: 'white'}}>
            <Text style={{fontWeight: '700', fontSize: 36}}>$1 Amazon Credit</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer goalData={this.props.navigation.state.params.goalData} level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(UsePerks)
