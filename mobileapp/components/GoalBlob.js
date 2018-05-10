import React, { Component } from 'react';
import { ProgressViewIOS, Dimensions, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation'
import * as firebase from "firebase";

class GoalBlob extends Component {

  state = {
    width: 0,
    height: 0,
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
      <View style={{backgroundColor: '#dbdcdd'}}>
        {(this.props.goalType == "Ten" || this.props.goalType == "Twenty" || this.props.goalType == "Thirty" || this.props.goalType == "Ultimate" || this.props.goalType == "UsainBolt") ?
          <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4c20d', width: this.state.width, height: this.state.height, borderRadius: 10}}>
            <Text style={{marginTop: 10, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.details} </Text>
            <ProgressViewIOS style={{flex: 1, width: Dimensions.get('window').width * 0.5}} progress={this.props.currentSteps / this.props.endSteps}> </ProgressViewIOS>
            <Text style={{fontWeight: '600'}}>{this.props.currentSteps + " "} / {this.props.endSteps} Steps</Text>
            <ProgressViewIOS style={{flex: 1, width: Dimensions.get('window').width * 0.5}} progress={this.props.currentDuration / this.props.endDuration}> </ProgressViewIOS>
            <Text style={{fontWeight: '600', marginBottom: 20}}>{this.props.currentDuration} / {this.props.endDuration}{" "}{this.props.timeType}</Text>
          </View>

        :

        this.props.goalType == "StepWarrior" ?

        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4c20d', width: this.state.width, height: this.state.height, borderRadius: 10}}>
          <Text style={{marginTop: 20, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.details} </Text>
          <ProgressViewIOS style={{flex: 1, width: Dimensions.get('window').width * 0.5}} progress={this.props.currentSteps / this.props.endSteps}> </ProgressViewIOS>
          <Text style={{fontWeight: '600', height: 45}}>{this.props.currentSteps + " "} / {this.props.endSteps} Steps</Text>
        </View>

        :

        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.goalType == "CheckItUnused" ? '#f4c20d' : 'lightgreen', width: this.state.width, height: this.state.height, borderRadius: 10}}>
          <Text style={{marginTop: 20, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.goalType == "CheckItUnused" ? "Reach A Checkpoint": "Reached A Checkpoint!"} </Text>
          <ProgressViewIOS style={{flex: 1, width: Dimensions.get('window').width * 0.5}} progress={this.props.goalType == "CheckItUnused" ? 0 : 1}> </ProgressViewIOS>
          <Text style={{fontWeight: '600', height: 45}}>{this.props.goalType == "CheckItUnused" ? 0 : 1} / 1</Text>
        </View>
        }
      </View>
    );
  }

}

export default withNavigation(GoalBlob);
