import React, { Component } from 'react';
import { ProgressViewIOS, Dimensions, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation'

class GoalBlob extends Component {

  state = {
    width: 0,
    height: 0,
  }

  componentDidMount() {
    var width = Dimensions.get('window').width * 0.8;
    width = Math.round(width);
    var height = Dimensions.get('window').height * 0.25;
    height = Math.round(height);
    this.setState({width: width, height: height})
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'gold', width: this.state.width, height: this.state.height, borderRadius: 10}}>
        <Text style={{marginTop: 10, color: 'black', fontWeight: '600', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.details} </Text>
        <ProgressViewIOS style={{flex: 1, width: Dimensions.get('window').width * 0.5}} progress={this.props.steps / 10000}> </ProgressViewIOS>
        <Text style={{fontWeight: '600'}}>{this.props.steps + " "} / 10,000 Steps</Text>
        <ProgressViewIOS style={{flex: 1, width: Dimensions.get('window').width * 0.5}} progress={0.714}> </ProgressViewIOS>
        <Text style={{fontWeight: '600', marginBottom: 20}}>5 / 7 Days</Text>
      </View>
    );
  }

}

export default withNavigation(GoalBlob);
