import React, { Component } from 'react';
import { Image, Dimensions, View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import * as firebase from "firebase";

class PerkBanner extends Component {

  render() {
    return (
      <View style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', opacity: 1, padding: 10, backgroundColor: this.props.color }}>
        <Image
          style={{marginTop: 20, backgroundColor: this.props.color, margin: 15, width: 75, height: 75}}
          resizeMode="contain"
          source={images[this.props.imageCode]}
        />
        <View style={{flex: 1, margin: 10, backgroundColor: this.props.color, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{opacity: 1, color: 'white', fontSize: 24, fontWeight: '600'}}>{this.props.details}</Text>
        </View>
      </View>
    )
  }
}

const images = {
  coffee: require('../images/starbucks.png')
}

export default withNavigation(PerkBanner)
