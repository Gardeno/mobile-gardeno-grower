import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, FlatList, Dimensions, Platform, Image, Button, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Header from './Header';

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

class AuthenticatedHomeScreenClass extends React.Component {

  componentDidMount() {
    //this.onSignInPressed();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#57b6b2'}}>
        <Header title={'OMG AUTH'} navigation={this.props.navigation} />

      </View>
    );
  }
}

export default HomeScreen = connect(({ home }) => {
  return {
    isEditing: home.isEditing,
  }
})(AuthenticatedHomeScreenClass);