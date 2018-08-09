import React from 'react';
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

class AuthenticatedHomeScreenClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTabBar: false,
      activeTab: null,
    }
  }

  logout = async (showAlert) => {
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
      console.log(error);
      console.log(response);
      if (error || !response) {
        await this.logout(true);
      } else {
        this.props.dispatch(loadedUser(response.data));
        const activeTab = (response.data.invitations.length > 0 && response.data.grows.length === 0) ? 'settings' : 'home';
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
        </View>}
        {(activeTab === 'settings') &&
        <View style={{position: 'absolute', top: STATUS_BAR_HEIGHT + 50, left: 0, right: 0, bottom: 0}}>
          <View style={{height: 75, padding: 14}}>
            <TouchableOpacity onPress={this.pressedLogout}
              style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>
              <Text style={{fontSize: 18}}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>}
        {showTabBar && <View
          style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 + BOTTOM_BAR_HEIGHT, backgroundColor: '#79dea8', paddingBottom: BOTTOM_BAR_HEIGHT}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={this.changeTab('home')}>
                <Ionicons name={activeTab === 'home' ? 'ios-home' : 'ios-home-outline'} size={32} color={'black'}/>
              </TouchableOpacity>
            </View>
            <View style={{width: '50%'}}>
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

export default HomeScreen = connect(({ home }) => {
  return {
    isEditing: home.isEditing,
  }
})(AuthenticatedHomeScreenClass);