import React, { Component } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Pedometer } from "expo";
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import StepBlob from '../components/StepBlob'
import GoalBlob from '../components/GoalBlob'

class HomeScreen extends Component {

  state = {
    blobContWidth: 0,
    blobHeight: 0,
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    var blobContWidth = (Dimensions.get('window').width * 0.85)
    var height = (Dimensions.get('window').width * 0.2) + (Dimensions.get('window').height * 0.2);
    height  = Math.round(height);
    this.setState({blobHeight: height, blobContWidth: blobContWidth});
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View>
        <Header withLogOutButton />
        <ScrollView>
          <View style={{backgroundColor: 'lightgrey'}}>
            <ScrollView
                style={{paddingTop: 20, paddingBottom: 20}}
                scrollEventThrottle={10}
                horizontal
                showsHorizontalScrollingIndicator={false}
                contentContainerStyle={{padding: Math.round(Dimensions.get('window').width * 0.05)}}
                decelerationRate='fast'
                snapToAlignment='center'
                contentOffset={{x: Math.round(Dimensions.get('window').width * 0.825)}}
                snapToInterval={Math.round(Dimensions.get('window').width * 0.8825)}
              >
              <View style={{flex: 1, alignItems: 'center', width: this.state.blobContWidth}}>
                <StepBlob bgColor='blue' type='Weekly Steps' count={this.state.pastStepCount + this.state.currentStepCount + 9835} />
              </View>
              <View style={{flex: 1, alignItems: 'center', width: this.state.blobContWidth}}>
                <StepBlob bgColor='red' type='Daily Steps' count={this.state.pastStepCount + this.state.currentStepCount} />
              </View>
              <View style={{flex: 1, alignItems: 'center', width: this.state.blobContWidth}}>
                <StepBlob bgColor='green' type='Monthly Steps' count={this.state.pastStepCount + this.state.currentStepCount + 33280} />
              </View>
            </ScrollView>
          </View>
          <View style={{backgroundColor: 'grey', paddingBottom: 120}}>
            <Text style={{fontSize: 28, margin: 15, color: 'white', fontWeight: '900', textAlign: 'center'}}>
              Goals
            </Text>
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'grey'}}>
              <GoalBlob steps={this.state.pastStepCount + this.state.currentStepCount} details='Walk 10,000 Steps For 7 Days'/>
            </View>
            <View style={{marginTop: 30, flex: 1, alignItems: 'center', backgroundColor: 'grey'}}>
              <GoalBlob steps={this.state.pastStepCount + this.state.currentStepCount} details='Walk 10,000 Steps For 7 Days'/>
            </View>
            <View style={{marginTop: 30, flex: 1, alignItems: 'center', backgroundColor: 'grey'}}>
              <GoalBlob steps={this.state.pastStepCount + this.state.currentStepCount} details='Walk 10,000 Steps For 7 Days'/>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(HomeScreen);
