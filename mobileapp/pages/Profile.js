import React, { Component } from 'react';
import { Image, Dimensions, View, Text, ScrollView } from 'react-native'
import * as firebase from "firebase";
import Header from '../components/Header'
import Footer from '../components/Footer'
import PerkBanner from '../components/PerkBanner'
import NextLevelBanner from '../components/NextLevelBanner'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

class Profile extends Component {

  state={
    perksWidth: 0,
    rating: 0,
    level: 0,
    loading: true,
    perkData: [],
    nextLevelData: null
  }

  componentDidMount() {
    var current = this;
    this.setState({perkData: []})
    var ratingRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/Rating');
    var perkLibRef = firebase.database().ref('PerksLib');
    ratingRef.once('value', (info) => {
      this.setState({level: info.val().currentLevel, rating: info.val().currentRating})
    }).then(() => {
      var i = 0;
      perkLibRef.once('value', (perks) => {
        perks.forEach((perk) => {
          i++
          var perkInfo = perk.val()
          var data =  {
            details: perkInfo.details,
            color: perkInfo.color,
            imageCode: perkInfo.imageCode
          }
          if(i >= 2 && i <= current.state.level){
            var temp = current.state.perkData;
            temp.push(data);
            current.setState({perkData: temp})
          }
          if(i == current.state.level + 1){
            console.log("perk data is: " + current.state.perkData);
            current.setState({nextLevelData: data, loading: false})
          }
        })
      })
    })
    var width = Dimensions.get('window').width * 0.9
    width = Math.round(width);
    this.setState({perksWidth: width})
  }

  renderPerks = () => {
    var current = this;
    return this.state.perkData.map((obj, i) => (
        <PerkBanner key={i}
                    details={obj.details}
                    color={obj.color}
                    imageCode={obj.imageCode} />

      )
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title="Profile" withBackButton withLogOutButton />
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          style={{backgroundColor: 'lightgrey'}}
          >
          <Text style={{margin: 20, fontSize: 36, fontWeight: '900', textAlign: 'center'}}>
            Level
          </Text>
          <View style={{flex: 1, borderRadius: 85, borderWidth: 15, borderColor: 'black', width: 175, height: 175, backgroundColor: 'red', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 100, fontWeight: '900'}}>{this.state.level}</Text>
          </View>
          <Text style={{margin: 20, fontSize: 36, fontWeight: '900', textAlign: 'center'}}>
            Rating {this.state.rating}
          </Text>
          <View style={{flex: 1, marginTop: 20, borderRadius: 5, alignItems: 'center', width: this.state.perksWidth, backgroundColor: 'black', paddingBottom: 150, marginBottom: 50}}>
            <View>
              <Text style={{fontSize: 32, fontWeight: '900', color: 'white', textAlign: 'center', padding: 20}}>
                Perks:
              </Text>
            </View>
            <View>
              {this.state.level == 1 ?
                <View style={{flex: 1, width: '100%', height: 50, flexDirection: 'row', justifyContent: 'center', opacity: 1, padding: 10, backgroundColor: 'grey' }}>
                  <View style={{marginTop: 20, margin: 15, width: 75, height: 75}}>
                    <Icon name="face" size={72} color='white'/>
                  </View>
                  <View style={{flex: 1, margin: 10, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{opacity: 1, color: 'white', fontSize: 24, fontWeight: '600'}}>No Perks Yet!</Text>
                  </View>
                </View>
                : null
              }
              {this.state.loading ? null : this.renderPerks()}
            </View>
          </View>
          <View style={{flex: 1, width: '100%', backgroundColor: 'gold'}}>
            {this.state.loading ? null: <NextLevelBanner level={this.state.level} nextLevelData={this.state.nextLevelData}/> }
          </View>
        </ScrollView>
        <Footer />
      </View>
    )
  }

}

export default withNavigation(Profile)
