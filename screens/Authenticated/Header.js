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

class AuthenticatedHeader extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return <View style={{height: STATUS_BAR_HEIGHT + 50, position: 'absolute', left: 0, top: 0, right: 0, backgroundColor: '#79dea8'}}>
      <View style={{flex: 1, flexDirection: 'row', paddingTop: STATUS_BAR_HEIGHT}}>
        <View style={{width: '25%', height: '100%'}}>
          {/*<TouchableOpacity style={{flex: 1, justifyContent: 'center', paddingLeft: 14}} onPress={this.onBackPressed}>
            <Ionicons name="ios-arrow-back" size={32} color={'white'}/>
          </TouchableOpacity>
          */}
        </View>
        <View style={{width: '50%', height: '100%'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../images/logo-inline-with-text.png')} style={{height: 30, width: '100%'}} />
          </View>
        </View>
        <View style={{width: '25%', height: '100%',}}>

        </View>
      </View>
    </View>
  }

}

export default connect((state) => {
  return {}
})(AuthenticatedHeader);