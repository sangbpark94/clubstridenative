import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation'

class StepBlob extends Component {

  state = {
    width: 0,
    height: 0,
    innerwidth: 0,
    innerheight: 0,
  }

  componentDidMount() {
    var width = Dimensions.get('window').width * 0.8;
    width = Math.round(width);
    var height = Dimensions.get('window').height * 0.25;
    height = Math.round(height);
    var innerWidth = Dimensions.get('window').width * 0.7;
    innerWidth = Math.round(innerWidth);
    var innerHeight = Dimensions.get('window').height * 0.02;
    innerHeight = Math.round(innerHeight);
    this.setState({width: width, height: height, innerWidth: innerWidth, innerHeight: innerHeight})
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.bgColor, width: this.state.width, height: this.state.height, borderRadius: 10}}>
        <Text style={{marginTop: 10, color: 'black', fontWeight: '900', width: '100%', height: 20, fontSize: 18, textAlign: 'center'}}> {this.props.type} </Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, width: this.state.innerWidth, margin: 20, marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 80, textAlign: 'center'}}>
            {this.props.count}
          </Text>
        </View>
      </View>
    );
  }

}

export default withNavigation(StepBlob);
