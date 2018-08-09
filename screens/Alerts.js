import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { RED_COLOR, YELLOW_COLOR, DARK_GREEN_COLOR as GREEN_COLOR, STATUS_BAR_HEIGHT } from '../shared/styles';


const styles = {
  alertView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT + 50,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  alertText: { color: 'white', textAlign: 'center', marginTop: STATUS_BAR_HEIGHT + 15, fontWeight: 'bold' }
};

const BACKGROUND_COLORS = {
  error: 'black',
  warning: YELLOW_COLOR,
  success: '#50e85b',
};

const TEXT_COLORS = {
  error: 'white',
  warning: 'black',
  success: 'white',
};

const getViewStyle = (type) => {
  const backgroundColor = BACKGROUND_COLORS[type];
  if (!backgroundColor) {
    return {};
  }
  return {
    backgroundColor: BACKGROUND_COLORS[type],
  };
};

const getTextStyle = (type) => {
  if (TEXT_COLORS[type]) {
    return {
      color: TEXT_COLORS[type],
    }
  }
  return {};
};

class Alerts extends React.Component {

  static propTypes = {
    alerts: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { alerts } = this.props;
    if (alerts.length === 0) {
      return <View />
    }
    return <View
      style={Object.assign({}, styles.alertView, getViewStyle(alerts[0].messageType))}
    >
      <Text style={Object.assign({}, styles.alertText, getTextStyle(alerts[0].messageType))}
            accessible={true}
            accessibilityLabel={'Alert!'}>
        {alerts[0].message}
      </Text>
    </View>;
  }
}

const AlertsComponent = connect((state) => {
  return {
    alerts: state.alerts
  };
})(Alerts);

export default AlertsComponent;