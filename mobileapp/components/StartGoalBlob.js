import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation'
import * as firebase from "firebase";

class GoalBlob extends Component {

  state = {
    width: 0,
    height: 0,
    renderConfirmation: "false"
  }

  componentDidMount() {
    var width = Dimensions.get('window').width * 0.8;
    width = Math.round(width);
    var height = Dimensions.get('window').height * 0.2;
    height = Math.round(height);
    this.setState({width: width, height: height})
    var d = new Date();
    var n = d.getTime();
  }

  render() {
    return (
      <View style={{backgroundColor: '#3d3d3d'}}>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'gold', width: this.state.width, height: this.state.height, borderRadius: 10}} onPress={() => this.props.toggleModal(this.props.goalname)}>
          <Text style={{marginTop: 10, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.goalname} </Text>
          <Text style={{marginTop: 10, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.details} </Text>
          <Text style={{marginTop: 10, marginBottom: 10, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> Reward: {this.props.points} points </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default withNavigation(GoalBlob);
