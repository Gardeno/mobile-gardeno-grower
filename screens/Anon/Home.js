import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, FlatList, Dimensions, Platform, Image, Button, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import { toggleEdit } from '../../actions/home';

import { BOTTOM_BAR_HEIGHT } from '../../shared/styles';

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  GridViewBlockStyle: {
    flex: 1,
    height: 125,
    margin: 0,
    padding: 0,
    marginBottom: 8,
  },

  GridViewInsideTextItemStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 30,
    borderTopWidth: 1,
    borderTopColor: '#468C98',
  },

  sectionHeader: {
    height: 20,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  }

});

const sounds = [];

class EditButtonClass extends React.Component {

  onPress = () => {
    this.props.dispatch(toggleEdit());
  };

  render() {
    const { isEditing } = this.props;
    return <Button title={isEditing ? 'Done': 'Edit'} onPress={this.onPress}/>
  }

}

const EditButton = connect(({ home }) => {
  return {
    isEditing: home.isEditing,
  }
})(EditButtonClass);

class HomeScreenClass extends React.Component {

  static navigationOptions = ({ navigation, state }) => {
    console.log('state: ', state);
    return {
      title: 'Gardeno - Grower',
      headerLeft: <EditButton />,
      headerRight: (
        <TouchableOpacity
          style={{paddingRight: 8}}
          onPress={() => navigation.navigate('RecordSound')}
        >
          <Ionicons name="md-add" size={32}/>
        </TouchableOpacity>
      ),
    }
  };

  playItem = (item) => {
    return async() => {
      const soundObject = new Expo.Audio.Sound();
      try {
        await soundObject.loadAsync(item.path);
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.error(error);
      }
    }
  };

  onSignUpPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

  onSignInPressed = () => {
    this.props.navigation.navigate('SignIn');
  };

  componentDidMount() {
    this.onSignUpPressed();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#57b6b2'}}>
        <Image style={{flex: 1, resizeMode: 'cover', width: '100%'}} source={require('../../images/splash.png')}  />
        {/*
         <Image source={require('../images/leaf-solo.png')} style={{width: 80, height: 80}} />
         <View style={{height: 100, backgroundColor: 'red'}}>
         <Text>Before</Text>
         <Image source={require('../images/leaf-solo.svg')} style={{width: 80, height: 80}} />
         <Text>After</Text>
         </View>

         */}
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