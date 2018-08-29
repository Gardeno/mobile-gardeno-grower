import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  Image,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Header from './Header';

import { BOTTOM_BAR_HEIGHT, STATUS_BAR_HEIGHT, } from '../../shared/styles';
import { removeFromKeychain } from '../../shared/helpers';

import { loadUser, loadedUser } from '../../actions/Authenticated/home';
import { loggedOut } from '../../actions/auth';
import { addAlert } from '../../actions/alerts';

import { StackActions, NavigationActions } from 'react-navigation';

import HomeScreen from './Home';
import SettingsScreen from './Settings';
import TimeScreen from './Time';

class AuthenticatedHomeTabWrapperClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTabBar: false,
      activeTab: null,
    }
  }

  logout = async(showAlert) => {
    await removeFromKeychain();
    if (showAlert) {
      this.props.dispatch(addAlert({ message: 'Something went wrong. Please login again.' }))
    }
    this.props.dispatch(loggedOut());
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
      key: null,
    }));
  };

  setup = async() => {
    this.props.dispatch(loadUser(async(error, response) => {
      if (error || !response) {
        await this.logout(true);
      } else {
        let activeTab = (response.data.invitations.length > 0 && response.data.grows.length === 0) ? 'settings' : 'home';
        activeTab = 'time';
        this.setState({
          showTabBar: true,
          activeTab,
        })
      }
    }));
  };

  componentWillMount() {
    this.setup();
  }

  changeTab = (activeTab) => {
    return () => {
      this.setState({
        activeTab,
      })
    }
  };

  pressedLogout = () => {
    this.logout(false);
  };

  render() {
    const { showTabBar, activeTab } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#57b6b2'}}>
        <Header navigation={this.props.navigation}/>
        {(activeTab === 'home') &&
        <View style={{position: 'absolute', top: STATUS_BAR_HEIGHT + 50, left: 0, right: 0, bottom: 0}}>
          <HomeScreen />
        </View>}
        {(activeTab === 'time') &&
        <View style={{position: 'absolute', top: STATUS_BAR_HEIGHT + 50, left: 0, right: 0, bottom: 0}}>
          <TimeScreen />
        </View>}
        {(activeTab === 'settings') &&
        <View style={{position: 'absolute', top: STATUS_BAR_HEIGHT + 50, left: 0, right: 0, bottom: 0}}>
          <SettingsScreen pressedLogout={this.pressedLogout}/>
        </View>}
        {showTabBar && <View
          style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 + BOTTOM_BAR_HEIGHT, backgroundColor: '#79dea8', paddingBottom: BOTTOM_BAR_HEIGHT}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '33%'}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={this.changeTab('home')}>
                <Ionicons name={activeTab === 'home' ? 'ios-home' : 'ios-home-outline'} size={32} color={'black'}/>
              </TouchableOpacity>
            </View>
            <View style={{width: '33%'}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={this.changeTab('time')}>
                <Ionicons name={activeTab === 'time' ? 'ios-clock' : 'ios-clock-outline'} size={32} color={'black'}/>
              </TouchableOpacity>
            </View>
            <View style={{width: '33%'}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={this.changeTab('settings')}>
                <Ionicons name={activeTab === 'settings' ? 'ios-settings' : 'ios-settings-outline'} size={32}
                          color={'black'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>}
      </View>
    );
  }
}

export default HomeTabWrapper = connect()(AuthenticatedHomeTabWrapperClass);