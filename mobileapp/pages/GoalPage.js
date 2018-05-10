import React, { Component } from 'react';
import { Modal, TouchableHighlight, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Button, Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Icon } from 'react-native-elements'
import StartGoalBlob from '../components/StartGoalBlob'
import * as firebase from "firebase";

class GoalPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      level: 0,
      loading: true,
      page: "Start",
      startgoaldata: [],
      modalVisible: false,
      selectedgoal: null
    }
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
  }


  componentDidMount(){
    this.setState({level: this.props.level})
    this.setGoalData();
  }

  setGoalData = () => {
    this.setState({startgoaldata: []});
    var current = this;
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/Rating/currentLevelName').once('value', (lvl) => {
      var levelname = lvl.val();
      var goalsLibRef = firebase.database().ref('GoalsLib/' + levelname);
      var goaldata = current.props.navigation.state.params.goalData;
      var startedgoals = [];
      for(var i = 0; i < goaldata.length; i++){
        startedgoals.push(goaldata[i].goalType)
      }
      //console.log(startedgoals)
      goalsLibRef.once('value', (goals) => {
        var i = 0;
        var num = goals.numChildren() + 2;
        goals.forEach((goal) => {
          if(goal.key == 'CheckIt'){
            i++
            if(i == num){
              current.setState({loading: false})
            }
          }
          else if(goal.key == 'GoalDay'){
            goal.forEach((goalday) => {
              i++;
              if(startedgoals.indexOf(goalday.key) == -1){
                var data =  {
                  goalname: 'Goal Day ' + goalday.key,
                  details: goalday.child('details').val(),
                  points: goalday.child('points').val()
                }
                var temp = current.state.startgoaldata;
                temp.push(data);
                current.setState({startgoaldata: temp})
              }
              if(i == num){
                current.sortBlobs()
                current.setState({loading: false})
              }
            })
          }
          else {
            i++;
            if(startedgoals.indexOf(goal.key) == -1){
              var data =  {
                goalname: goal.key == 'StepWarrior' ? 'Step Warrior' : goal.key == 'UsainBolt' ? 'Usain Bolt' : goal.key,
                details: goal.child('details').val(),
                points: goal.child('points').val()
              }
              var temp = current.state.startgoaldata;
              temp.push(data);
              current.setState({startgoaldata: temp})
            }
            if(i == num){
              current.sortBlobs()
              current.setState({loading: false})
            }
          }
        })
      })
    })
  }

  sortBlobs = () => {
    var arr = this.state.startgoaldata
    var sorteddata = arr.sort((a, b) => {
      return a.points - b.points
    })
    this.setState({startgoaldata: sorteddata});
  }

  renderStartGoalBlobs = () => {
    var current = this;
    return this.state.startgoaldata.map((obj, i) => (
        <View key={i} style={{flex: 1, alignItems: 'center', backgroundColor: '#3d3d3d', marginBottom: 30}}>
          <StartGoalBlob  goalname={obj.goalname}
                          details={obj.details}
                          points={obj.points}
                          toggleModal={this.toggleModalVisible}
                          />
        </View>
      )
    )
  }

  toggleModalVisible(name) {
    var status = this.state.modalVisible
    this.setState({selectedgoal: name, modalVisible: !status});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="Goals" level={this.props.navigation.state.params.level}/>
        <View>
          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{flex: 1, position: 'absolute', left: '17.5%', right: '17.5%', top: '37%', bottom: '37%', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', marginTop: 22}}>
              <View style={{margin: 10, marginTop: 25, marginBottom: 25}}>
                <Text style={{fontSize: 23, fontWeight: '800', textAlign: 'center'}}>Ready to start</Text>
                <Text style={{fontSize: 23, fontWeight: '800', textAlign: 'center'}}>{this.state.selectedgoal}?</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <TouchableHighlight
                  style={{flex: 1, backgroundColor: 'green', justifyContent: 'center', borderBottomLeftRadius: 10, alignItems: 'center'}}
                  onPress={() => {
                    this.toggleModalVisible();
                  }}>
                  <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{flex: 1, backgroundColor: 'grey', justifyContent: 'center', borderBottomRightRadius: 10, alignItems: 'center'}}
                  onPress={() => {
                    this.toggleModalVisible();
                  }}>
                  <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView>
          <View style={{flexDirection: 'row', height: 60 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.setState({page: "Start"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'white'}}>
                  Start
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#eaeadc', justifyContent: 'center'}} onPress={()=>this.setState({page: "Goal"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: '#3d3d3d'}}>
                  Log
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.page != "Start" ?

          <View>
            <View style={{backgroundColor: '#eaeadc', justifyContent: 'center'}}>
            </View>
          </View>

          :

          <View>
            <View style={{backgroundColor: '#3d3d3d', justifyContent: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{margin: 20, fontSize: 22, color: '#eaeadc'}}> Pick a goal! </Text>
              </View>
              <View>
                {this.state.loading == true ? null : this.renderStartGoalBlobs()}
              </View>
            </View>
          </View>

          }
        </ScrollView>
        <Footer goalData={this.props.navigation.state.params.goalData} level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(GoalPage)
