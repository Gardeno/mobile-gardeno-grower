import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, FlatList, Dimensions, Platform, Image, Button, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import { toggleEdit } from '../../actions/home';

import { BOTTOM_BAR_HEIGHT } from '../../shared/styles';

class HomeScreenClass extends React.Component {

  onSignUpPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

  onSignInPressed = () => {
    this.props.navigation.navigate('SignIn');
  };

  componentDidMount() {
    //this.onSignInPressed();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#57b6b2'}}>
        <Image style={{flex: 1, resizeMode: 'cover', width: '100%'}} source={require('../../images/splash.png')}  />
        <View style={{position: 'absolute', bottom: BOTTOM_BAR_HEIGHT + 14 + 60, height: 80, left: 0, right: 0}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <View style={{position: 'absolute', left: 8, top: 10, right: 4, bottom: 10, borderRadius: 4, backgroundColor: '#f1a45e'}}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f09f54', borderRadius: 4}} onPress={this.onSignInPressed}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{width: '50%'}}>
              <View style={{position: 'absolute', left: 4, top: 10, right: 8, bottom: 10, backgroundColor: '#79dea8', borderRadius: 4}}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={this.onSignUpPressed}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: BOTTOM_BAR_HEIGHT + 14, left: 0, right: 0, height: 60}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Looking for the non-grower Gardeno app?
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen = connect(({ home }) => {
  return {
    isEditing: home.isEditing,
  }
})(HomeScreenClass);