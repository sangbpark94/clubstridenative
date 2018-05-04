import React, { Component } from 'react';
import { Image, Dimensions, View, Text, ScrollView } from 'react-native'
import * as firebase from "firebase";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { withNavigation } from 'react-navigation'

class Profile extends Component {

  state={
    perksWidth: 0,
    rating: 0,
    level: 0,
  }

  componentDidMount() {
    var ratingRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/Rating');
    ratingRef.once('value', (info) => {
      this.setState({level: info.val().currentLevel, rating: info.val().currentRating})
    })
    var width = Dimensions.get('window').width * 0.9
    width = Math.round(width);
    this.setState({perksWidth: width})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withBackButton withLogOutButton />
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          style={{backgroundColor: 'lightgrey'}}
          >
          <Text style={{margin: 20, fontSize: 36, fontWeight: '900', textAlign: 'center'}}>
            Level
          </Text>
          <View style={{flex: 1, borderRadius: 85, borderWidth: 15, borderColor: 'black', width: 175, height: 175, backgroundColor: 'blue', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 100, fontWeight: '900'}}>{this.state.level}</Text>
          </View>
          <Text style={{margin: 20, fontSize: 36, fontWeight: '900', textAlign: 'center'}}>
            Rating {this.state.rating}
          </Text>
          <View style={{flex: 1, marginTop: 20, borderRadius: 5, alignItems: 'center', width: this.state.perksWidth, backgroundColor: 'black', paddingBottom: 50, marginBottom: 50}}>
            <View>
              <Text style={{fontSize: 32, fontWeight: '900', color: 'white', textAlign: 'center', padding: 20}}>
                Perks:
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', opacity: 1, padding: 10, backgroundColor: 'darkgreen' }}>
              <Image
                style={{backgroundColor: 'darkgreen', margin: 15, width: 75, height: 75}}
                resizeMode="contain"
                source={require('../images/starbucks.png')}
              />
              <View style={{flex: 1, margin: 10, backgroundColor: 'darkgreen', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{opacity: 1, color: 'white', fontSize: 24, fontWeight: '600'}}>Free Coffee Every 2 Weeks!</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, width: '100%', height: 150, backgroundColor: 'gold'}}>
            <Text>
              Some Text
            </Text>
          </View>
        </ScrollView>
        <Footer />
      </View>
    )
  }

}

export default withNavigation(Profile)
