import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Image, Button} from 'react-native';
import { withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";

class Footer extends Component {

  render() {
    return (
      <View
        style={styles.footer}>
        <TouchableOpacity style={{flex: 1}}>
          <Icon name='room' color='white' size={36}/>
          <Text style={{fontSize: 13, textAlign: 'center', color: 'white'}}>
            Rest Checkpoint
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}}>
          <Icon name='assignment' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Start Goals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}}>
          <Icon name='favorite' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Health
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}}>
          <Icon name='grade' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Use Perks
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default withNavigation(Footer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor:'#222',
  },
  back: {
    width: 24,
    height:24,
    margin: 16,
  },
});
