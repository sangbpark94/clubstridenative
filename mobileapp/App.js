import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import {AppLoading} from 'expo';
import Navigator from './navigation/Navigator'
import LoginScreen from './pages/LoginScreen'
export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
     login_status: -1,
     new_user: false,
    }
  }

  setNewDisplayName(name){
    this.setState({displayname: name, new_user: true})
  }

  componentDidMount() {
    var config = {
<<<<<<< HEAD
      apiKey: apiKey		,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId
=======
      apiKey: apiKey		,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId
>>>>>>> d2d65e9751e0e505663b3f5ca5878ceb11857fde
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.state.new_user){
          this.writeUserData(this.state.displayname, user.uid, "");
          user.updateProfile({
            displayName: this.state.displayname,
          }).then(()=>{
            console.log("Display Name Set To: " + user.displayName)
          });
          this.setState({new_user: false})
        }
        this.setState({login_status: 1})
      }else{
        this.setState({login_status: 0})
      }
    })
  }

  writeUserData(name, userID, imageURL) {
    firebase.database().ref('users/' + userID + '/General/').set({
      dateJoined: "TOBEFILLED",
      name: name,
      profile_picture: imageURL
    })
    firebase.database().ref('users/' + userID + '/Rating/').set({
      currentRating: 1000,
      currentLevel: 1,
      pointToNextLevel: 500
    })
    firebase.database().ref('users/' + userID + '/Steps/').set({
      total: 0
    })
    firebase.database().ref('users/' + userID + '/DistanceMiles/').set({
      total: 0
    })
    firebase.database().ref('users/' + userID + '/CaloriesBurned/').set({
      total: 0
    })
    firebase.database().ref('users/' + userID + '/FlightsClimbed/').set({
      total: 0
    })
  }


  render() {
      if (this.state.login_status == 0){
        return(
          <LoginScreen updateName={this.setNewDisplayName.bind(this)}/>
        )
      }else if (this.state.login_status == 1){
        return(
          <Navigator/>
        )
      }else{
        return(
          <AppLoading/>
        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
