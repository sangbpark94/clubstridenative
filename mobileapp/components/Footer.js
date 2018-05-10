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
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('Checkpoints', {goalData: this.props.goalData, level: this.props.level})}>
          <Icon name='room' color='white' size={36}/>
          <Text style={{fontSize: 12, textAlign: 'center', color: 'white'}}>
            Checkpoints
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('GoalPage', {goalData: this.props.goalData, level: this.props.level})}>
          <Icon name='assignment' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Goals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this.props.navigation.navigate('HomeScreen', {goalData: this.props.goalData, level: this.props.level})}>
          <Image style={{width: 70, height: 70}} source={{uri: 'data:image/png;base64,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'}} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('Health', {goalData: this.props.goalData, level: this.props.level})}>
          <Icon name='favorite' color='white' size={36}/>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Health
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('UsePerks', {goalData: this.props.goalData, level: this.props.level})}>
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
