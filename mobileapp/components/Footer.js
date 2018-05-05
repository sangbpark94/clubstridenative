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
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('Checkpoints', {level: this.props.level})}>
          <Icon name='room' color='white' size={36}/>
          <Text style={{fontSize: 12, textAlign: 'center', color: 'white'}}>
            Checkpoints
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('GoalPage', {level: this.props.level})}>
          <Icon name='assignment' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Goals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this.props.navigation.navigate('HomeScreen', {level: this.props.level})}>
          <Image style={{width: 70, height: 70}} source={require('../images/redshoe.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('Health', {level: this.props.level})}>
          <Icon name='favorite' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Health
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('UsePerks', {level: this.props.level})}>
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
