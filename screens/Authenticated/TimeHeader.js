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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { goToDate } from '../../actions/time';

import moment from 'moment';

class TimeHeader extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  jumpToToday = () => {
    this.props.dispatch(goToDate(moment()));
  };

  render() {
    const { date } = this.props;
    return <View
      style={{height: STATUS_BAR_HEIGHT + 50, position: 'absolute', left: 0, top: 0, right: 0, backgroundColor: '#79dea8'}}>
      <View style={{flex: 1, flexDirection: 'row', paddingTop: STATUS_BAR_HEIGHT}}>
        <View style={{width: '50%', height: '100%', paddingLeft: 12}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{date}</Text>
          </View>
        </View>
        <View style={{width: '50%', height: '100%', paddingRight: 12}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{height: 26, width: 26, position: 'absolute', right: 0}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={this.jumpToToday}>
                <MaterialIcons name={'today'} size={26} color={'white'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  }

}

export default connect(({ time }) => {
  return {
    date: time.selectedDate,
  }
})(TimeHeader);