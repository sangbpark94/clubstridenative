import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Image, Button} from 'react-native';
import { Constants } from 'expo'
import { withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";

class Header extends Component {
  render() {
    return (
        <View
          style={styles.header}>
          {
            this.props.withBackButton &&
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              >
              <Image
                resizeMode="contain"
                style={styles.back}
                source={Platform.OS === 'ios' ?  require('../images/ic_action_chevron_left.png') : require('../images/ic_action_arrow_back.png')}
              />
            </TouchableOpacity>
          }
          {
            this.props.withHomeButton &&
            <TouchableOpacity style={{paddingLeft: 14}}
              onPress={() => this.props.navigation.navigate('HomeScreen')}
              >
              <Icon name='home' color='white' size={36}/>
            </TouchableOpacity>
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold', margin: 16}}>{this.props.title}</Text>
            {
              this.props.withProfileButton &&
              <TouchableOpacity style={[styles.level_container, { backgroundColor: levelColor[this.props.level] }]}
                                onPress={() => this.props.navigation.navigate('Profile', {  goalData: this.props.goalData,
                                                                                            level: this.props.level})}>
                <Text style={styles.level_text}>{this.props.level}</Text>
              </TouchableOpacity>
            }
            {
              this.props.withLogOutButton &&
              <TouchableOpacity style={{position: 'absolute', flex: 1, width: 30, top: 10, right: 20}}
                onPress={() => firebase.auth().signOut()}
                >
                <Icon name='exit-to-app' color='white' size={36}/>
              </TouchableOpacity>
            }
          </View>
      </View>
    );
  }

}

export default withNavigation(Header);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: 'center',
    backgroundColor:'white',

  },
  back: {
    width: 24,
    height:24,
    margin: 16,
  },
  level_container: {
    position: 'absolute',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    top: 0,
    right: 25,
    borderRadius: 20,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: 'center'
  },
  level_text:{
    color: 'white',
    fontSize: 30,
    fontWeight: '900',

  },
});

const levelColor = {
  1:  'rgba(255,0,0, 0.5)',
  2:  'blue',
  3:  'green'
}
