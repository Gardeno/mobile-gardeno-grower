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
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/Authenticated/home';

class SettingsScreenClass extends React.Component {

  static propTypes = {
    pressedLogout: PropTypes.func.isRequired,
    invitations: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.dispatch(loadUser(() => {
      this.setState({refreshing: false});
    }));
  };

  render() {
    const { invitations } = this.props;
    return (
      <ScrollView style={{flex: 1, padding: 14}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <TouchableOpacity onPress={this.props.pressedLogout}
                          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 4, padding: 14}}>
          <Text style={{fontSize: 18}}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default SettingsScreen = connect(({ home }) => {
  return {
    invitations: home.invitations,
  }
})(SettingsScreenClass);