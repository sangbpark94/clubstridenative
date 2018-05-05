import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Button, Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";

class GoalPage extends Component {

  state={
    page: "StartGoals"
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="Goals" level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <View style={{flexDirection: 'row', height: 60 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.setState({page: "StartGoals"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'white'}}>
                  Start Goals
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#eaeadc', justifyContent: 'center'}} onPress={()=>this.setState({page: "GoalLog"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: '#3d3d3d'}}>
                  Goal Log
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.page != "StartGoals" ?

          <View>
            <View style={{height: 80, backgroundColor: '#eaeadc', justifyContent: 'center'}}>
            </View>
          </View>

          :

          <View>
            <View style={{height: 60, backgroundColor: '#3d3d3d', justifyContent: 'center'}}>
            </View>
          </View>

          }
        </ScrollView>
        <Footer level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(GoalPage)
