import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import MapView, { Marker } from 'react-native-maps'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as firebase from "firebase";

class Checkpoints extends Component {

  constructor(props) {
      super(props);

      this.state = {
        latitude: null,
        longitude: null,
        error: null,
        loading: true,
      };
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            loading: false
          });
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header withProfileButton title="CheckPoints" level={this.props.navigation.state.params.level}/>
        <ScrollView>
          {this.state.loading ? null :
          <MapView
            style={{height: 600, width: '100%'}}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}>
            <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
                    title="Your Location" />
          </MapView>
          }
        </ScrollView>
        <Footer goalData={this.props.navigation.state.params.goalData} level={this.props.navigation.state.params.level}/>
      </View>
    )
  }
}

export default withNavigation(Checkpoints)
