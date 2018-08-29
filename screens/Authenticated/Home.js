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
import { getMyGrows } from '../../actions/Authenticated/home';

class HomeScreenClass extends React.Component {

  static propTypes = {
    grows: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.dispatch(getMyGrows(() => {
      this.setState({refreshing: false});
    }));
  };

  render() {
    const { grows } = this.props;
    let contentView = <View />;
    if (grows.length === 0) {
      contentView = <View>
        <View style={{height: 160, backgroundColor: 'white', borderRadius: 4, paddingTop: 30}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: 20}}>You are not a part of
            any grows!</Text>
          <View style={{height: 75, padding: 12}}>
            <TouchableOpacity
              style={{flex: 1, borderRadius: 4, backgroundColor: '#337ab7', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Create Your First Grow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>;
    } else {

    }
    return (
      <ScrollView style={{flex: 1, padding: 14}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        {contentView}
      </ScrollView>
    );
  }
}

export default HomeScreen = connect(({ home }) => {
  return {
    grows: home.grows,
  }
})(HomeScreenClass);