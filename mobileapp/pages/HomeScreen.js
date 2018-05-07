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
    level: 0,
    dailysteps: 0,
    weeklysteps: 0,
    monthlysteps: 0,
    dailystartdate: null,
    weeklystartdate: null,
    monthlystartdate: null
  };

  componentDidMount() {
    var blobContWidth = (Dimensions.get('window').width * 0.85)
    var height = (Dimensions.get('window').width * 0.2) + (Dimensions.get('window').height * 0.2);
    height  = Math.round(height);
    this.setState({blobHeight: height, blobContWidth: blobContWidth});
    this._subscribe();
    this.setGoalData();
    this.setSteps();
    this.checkForDateResets();
    this.setLevel();
    setInterval(()=>this.updateSteps(), 30000)
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

  checkForDateResets(){
    var q = new Date(2018,4,4,13,30);
    var x = q.getTime();
    console.log("May 5: " + x);
    // q = new Date(2018, 3,30,0,0);
    // x = q.getTime();
    // console.log("April 30: " + x);
    // q = new Date(2018, 4,1,0,0);
    // x = q.getTime();
    // console.log("May 1: " + x);
    var current = this;
    var stepsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/StepInfo/StartDates');
    stepsRef.once('value', (info) => {
      var dailystartdate = info.val().Daily
      var weeklystartdate = info.val().Weekly
      var monthlystartdate = info.val().Monthly
      var enddailydate = dailystartdate + 86400000;
      var endweeklydate = weeklystartdate + 604800000;
      var temp = new Date(monthlystartdate);
      var endmonthlydate;
      var month = temp.getMonth();
      if(month == 1){
        endmonthlydate = monthlystartdate + 2419200000;
      }
      else if(month == 3 || month == 5 || month == 8 || month == 10){
        endmonthlydate = monthlystartdate + 2592000000;
      }
      else {
        endmonthlydate = monthlystartdate + 2678400000
      }

      var d = new Date();
      var t = d.getTime();
      // console.log("time now is " + t)
      // console.log("enddailydate is " + enddailydate)
      // console.log("endweeklydate is" + endweeklydate)
      // console.log("endmonthlydate is " + endmonthlydate)
      if(enddailydate <= t){
        this.resetStepsAndDate('dailystartdate', 'dailysteps', 'Daily')
        // console.log("entered 1")
      }
      else{
        setTimeout(function() {current.resetStepsAndDate('dailystartdate', 'dailysteps', 'Daily')}, enddailydate - t);
        // console.log("time til enddailydate " + (enddailydate - t));
        // console.log("entered 2")
      }
      if(endweeklydate <= t){
        this.resetStepsAndDate('weeklystartdate', 'weeklysteps', 'Weekly')
        // console.log("entered 3")
      }
      else{
        setTimeout(function() {current.resetStepsAndDate('weeklystartdate', 'weeklysteps', 'Weekly')}, endweeklydate - t);
        // console.log("time til enddailydate " + (endweeklydate - t));
        // console.log("entered 4")
      }
      if(endmonthlydate <= t){
        this.resetStepsAndDate('monthlystartdate', 'monthlysteps', 'Monthly')
        // console.log("entered 5")
      }
      else{
        setTimeout(function() {current.resetStepsAndDate('monthlystartdate', 'monthlysteps', 'Monthly')}, endmonthlydate - t);
        // console.log("time til enddailydate " + (endmonthlydate - t));
        // console.log("entered 6")
      }
      this.setState({
        dailystartdate: info.val().Daily,
        weeklystartdate: info.val().Weekly,
        monthlystartdate: info.val().Monthly
      })

    })
  }

  resetStepsAndDate(a,b,c) {
    // console.log("entered reset")
    var today = new Date();
    var t = today.getTime();
    var d;
    if(c == 'Daily'){
      d = Math.floor(t / 86400000) * 86400000;
    }
    else if(c == 'Weekly'){
      d = Math.floor(t / 604800000) * 604800000;
    }
    else if(c == 'Monthly'){
      var date = new Date(today.getYear(), today.getMonth(), 1, 0, 0);
      d = date.getTime();
    }
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/StepInfo/Steps/' + c).set(0);
    this.setState({ [a]: d, [b]: 0 })
  }

  setLevel() {
    var ratingRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/Rating');
    ratingRef.once('value', (info) => {
      this.setState({level: info.val().currentLevel})
    })
  }

  setSteps() {
    var stepsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/StepInfo/Steps');
    stepsRef.once('value', (info) => {
      this.setState({
        dailysteps: info.val().Daily,
        weeklysteps: info.val().Weekly,
        monthlysteps: info.val().Monthly
      })
    })
  }

  updateSteps() {
    var stepsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/StepInfo/Steps');
    stepsRef.set({
      Daily: this.state.dailysteps + this.state.currentStepCount,
      Weekly: this.state.weeklysteps + this.state.currentStepCount,
      Monthly: this.state.monthlysteps + this.state.currentStepCount
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
        <Header withProfileButton title="Club Stride" level={this.state.level}/>
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
                <StepBlob bgColor='blue' type='Weekly Steps' count={this.state.weeklysteps + this.state.currentStepCount} />
              </View>
              <View style={{flex: 1, alignItems: 'center', width: this.state.blobContWidth}}>
                <StepBlob bgColor='red' type='Daily Steps' count={this.state.dailysteps + this.state.currentStepCount} />
              </View>
              <View style={{flex: 1, alignItems: 'center', width: this.state.blobContWidth}}>
                <StepBlob bgColor='red' type='Monthly Steps' count={this.state.monthlysteps + this.state.currentStepCount} />
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
        <Footer level={this.state.level}/>
      </View>
    );
  }
}

export default withNavigation(HomeScreen);
