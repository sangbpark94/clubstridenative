import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class Health extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: "Daily"
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="Health" level={this.props.navigation.state.params.level}/>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', height: 60 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#db3236', justifyContent: 'center'}} onPress={()=>this.setState({page: "Daily"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 20, color: 'white'}}>
                  Daily
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#4885ed', justifyContent: 'center'}} onPress={()=>this.setState({page: "Weekly"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 20, color: 'white'}}>
                  Weekly
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#3cba54', justifyContent: 'center'}} onPress={()=>this.setState({page: "Monthly"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 20, color: 'white'}}>
                  Monthly
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}} onPress={()=>this.setState({page: "Lifetime"})}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 20, color: 'white'}}>
                  Lifetime
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.page == "Daily" ?

          <View>
            <View style={{height: 410, backgroundColor: '#db3236', justifyContent: 'center'}}>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Flights Climbed: 13</Text>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Calories Burned: 537</Text>
            </View>
          </View>

          : null }

          {this.state.page == "Weekly" ?

          <View>
            <View style={{height: 410, backgroundColor: '#4885ed', justifyContent: 'center'}}>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Flights Climbed: 27</Text>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Calories Burned: 1152</Text>
            </View>
          </View>

          : null }

          {this.state.page == "Monthly" ?

          <View>
            <View style={{height: 410, backgroundColor: '#3cba54', justifyContent: 'center'}}>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Flights Climbed: 71</Text>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Calories Burned: 5124</Text>
            </View>
          </View>

          : null }

          {this.state.page == "Lifetime" ?

          <View>
            <View style={{height: 410, backgroundColor: 'black', justifyContent: 'center'}}>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Lifetime Steps: 185,302</Text>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Flights Climbed: 329</Text>
              <Text style={{color: 'white', marginLeft: 20, marginBottom: 30, fontSize: 28}}>Calories Burned: 287181</Text>
            </View>
          </View>

          : null }

          }
        </ScrollView>
        <Footer goalData={this.props.navigation.state.params.goalData} level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(Health)
