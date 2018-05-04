import React, { Component } from 'react';
import { Image, Dimensions, View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'
import PerkBanner from '../components/PerkBanner'
import * as firebase from "firebase";

class NextLevelBanner extends Component {

  render() {
    return (
      <View>
        <View style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', opacity: 1, padding: 30, backgroundColor: 'gold' }}>
          <View style={{width: 100}}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '900'}}>Current Level</Text>
            <View style={{flex: 1, borderRadius: 100, height: 100, marginTop: 5, borderWidth: 10, borderColor: 'black', backgroundColor: levelColor[this.props.level], justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 42, fontWeight: '900'}}>{this.props.level}</Text>
            </View>
          </View>
          <View style={{flex: 1, marginTop: 50, margin: 10, backgroundColor: 'gold', justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="forward" size={80} color='black' />
          </View>
          <View style={{width: 100}}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '900'}}>Next Level</Text>
            <View style={{flex: 1, borderRadius: 100, height: 100, marginTop: 5, borderWidth: 10, borderColor: 'black', backgroundColor: levelColor[this.props.level+1], justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 42, fontWeight: '900'}}>{this.props.level+1}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', height: 60, backgroundColor: 'black'}}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 24, fontWeight: '900'}}>You will get:</Text>
        </View>
        <View>
          <PerkBanner details={this.props.nextLevelData.details}
                      color={this.props.nextLevelData.color}
                      imageCode={this.props.nextLevelData.imageCode} />
        </View>
      </View>
    )
  }
}

export default withNavigation(NextLevelBanner)

const levelColor = {
  1:  'red',
  2:  'blue',
  3:  'green'
}
