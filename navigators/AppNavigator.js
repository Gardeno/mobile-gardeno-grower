import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Modal, Text, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import Alerts from '../screens/Alerts';

import Home from '../screens/Anon/Home';
import SignUp from '../screens/Anon/SignUp';
import SignIn from '../screens/Anon/SignIn';
import AuthenticatedHome from '../screens/Authenticated/Home';
import { loadKeychainData } from '../shared/helpers';
import { loggedIn } from '../actions/auth';
import { addAlert } from '../actions/alerts';
import DismissableStackNavigator from './DismissableStackNavigator';

const Loading = () => {
  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#57b6b2'}}>

  </View>
};

export const AppNavigator = ({ initialRouteName }) => {
  const CustomNavigator = createStackNavigator({
    Home: {
      screen: Home,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    AuthenticatedHome: {
      screen: AuthenticatedHome,
    },
  }, {
    initialRouteName,
    navigationOptions: {
      header: null,
    },
  });
  return <CustomNavigator />;
};

class App extends React.Component {

  state = {
    loading: true,
  };

  static propTypes = {};

  constructor(props) {
    super(props);
    this.initialRouteName = null;
  }

  async componentWillMount() {
    const [loadError, { authToken }] = await loadKeychainData();
    if (loadError) {
      this.props.dispatch(addAlert({ message: loadError }));
    } else {
      console.log('token', authToken);
      if (authToken) {
        this.props.dispatch(loggedIn({ authToken }));
        this.initialRouteName = 'AuthenticatedHome';
      } else {
        this.initialRouteName = 'Home';
      }
      return this.setState({ loading: false });
      //TODO: Validate auth token?
      /*
       this.props.dispatch(receivedToken({ authToken: this.props.persistedToken.authToken }));
       this.initialRouteName = 'AuthenticatedHome';
       //
       */
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.persistedToken && !nextProps.persistedToken) {
      this.initialRouteName = 'Home';
      return true;
    }
    // Only re-render the first time, as nextProps will just be the persisted token loaded a second time
    // which will torch the app state and cause a crash
    return !!(this.state.loading && nextState && !nextState.loading);
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    console.log('initial route name: ', this.initialRouteName);
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle={'light-content'}/>
        <AppNavigator initialRouteName={this.initialRouteName || 'Home'}/>
        <Alerts />
      </View>
    );
  }

}

export default connect(({ auth }) => {
  return {
    persistedToken: auth.authToken,
  }
})(App);
