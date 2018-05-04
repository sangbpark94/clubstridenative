import React, { Component } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Pedometer } from "expo";
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StepBlob from '../components/StepBlob'
import GoalBlob from '../components/GoalBlob'
import * as firebase from "firebase";

class HomeScreen extends Component {

  state = {
    blobContWidth: 0,
    blobHeight: 0,
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    loading: true,
    goalData: [],
    checkItUsed: null,
  };

  componentDidMount() {
    var blobContWidth = (Dimensions.get('window').width * 0.85)
    var height = (Dimensions.get('window').width * 0.2) + (Dimensions.get('window').height * 0.2);
    height  = Math.round(height);
    this.setState({blobHeight: height, blobContWidth: blobContWidth});
    this._subscribe();
    this.setGoalData();
  }

  setGoalData = () => {
    var current = this;
    var userGoalsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/Goals');
    var goalsLibRef = firebase.database().ref('GoalsLib');
    this.setState({goalData: []});
    userGoalsRef.once('value', function(goals) {
      var i = 0;
      var num = goals.numChildren();
      goals.forEach(function(goal){
        var val = goal.val();
        firebase.database().ref('GoalsLib/' + val.key).once('value',
          function(info){
            i++;
            console.log(goal.key)
            if(goal.key == "CheckIt"){
              if(val.used == true)
                current.setState({checkItUsed: true})
            }
            else{
              var infoVal = info.val();
              console.log(goal.key)
              var data =  {
                goalType: goal.key,
                details: info.child("details").exists() ? infoVal.details : "",
                endDuration: info.child("duration").exists() ? infoVal.duration : "",
                currentSteps: val.currentSteps ? val.currentSteps : 0,
                endSteps: info.child("steps").exists() ? infoVal.steps : 0,
                endTime:goal.child("endTime").exists() ? val.endTime : "",
                endDate: info.child("endDate").exists() ? infoVal.endDate : "",
                timeType: info.child("timetype").exists() ? infoVal.timetype : "",
                currentDuration: val.currentDuration
              }
              var temp = current.state.goalData;
              temp.push(data);
              console.log(data)
              current.setState({goalData: temp})
            }
            if(i == num){
              current.setState({loading: false})
            }
          })
      })
    })
  }

  renderGoalBlobs = () => {
    var current = this;
    return this.state.goalData.map((obj, i) => (
        <View key={i} style={{flex: 1, alignItems: 'center', backgroundColor: 'grey', marginBottom: 30}}>
          <GoalBlob goalType={obj.goalType}
                    details={obj.details}
                    endDuration={obj.endDuration}
                    currentSteps={obj.currentSteps}
                    endSteps={obj.endSteps}
                    endTime={obj.endTime}
                    endDate={obj.endDate}
                    timeType={obj.timeType}
                    currentDuration={obj.currentDuration}
                    />
        </View>
      )
    )
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
      <View style={{flex: 1}}>
        <Header withProfileButton />
        <ScrollView>
          <View style={{backgroundColor: 'lightgrey'}}>
            <ScrollView
                style={{paddingTop: 5, paddingBottom: 5}}
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
            {this.state.loading == true ? null : this.renderGoalBlobs()}
            {this.state.loading == true ? null :
              this.state.checkItUsed == true ?
              <View style={{flex: 1, alignItems: 'center', backgroundColor: 'grey', marginBottom: 30}}>
                <GoalBlob goalType="CheckItUsed"/>
              </View>
              :
              <View style={{flex: 1, alignItems: 'center', backgroundColor: 'grey', marginBottom: 30}}>
                <GoalBlob goalType={"CheckItUnused"}/>
              </View>
            }
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

export default withNavigation(HomeScreen);
