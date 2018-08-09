import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Image,
  Clipboard,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Picker,
  Modal,
} from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../shared/styles';
import { Ionicons } from '@expo/vector-icons';

import AnonymousHeader from './Header';

class Login extends React.Component {

  render() {
    return <View style={{flex: 1, backgroundColor: '#57b6b2'}}>
      <AnonymousHeader navigation={this.props.navigation} title={'Sign In'}/>
      <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0}}>
        <View style={{flex: 1}}>
          <Text>Login</Text>
        </View>
      </View>
    </View>
  }

}

export default connect((state) => {
  return {}
})(Login);