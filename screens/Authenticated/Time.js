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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const WEEKS_TO_LOAD = 10;

const styles = {
  loadingWeeks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const WeekRenderer = (props) => {
  return (<View style={{flex: 1}}>
    {
      !props.loaded && <View style={{flex: 1, flexDirection: 'row'}}>
        {(Array.from(props.week.range.by('day')).map((day, counter) => {
          return <View style={{width: '14.28%', height: '100%'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: 32, height: 32, borderRadius: 16, backgroundColor: 'red'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>{day.format('dddd')[0]}</Text>
                </View>
              </View>
              <Text style={{fontSize: 10, paddingTop: 4}}>0:00</Text>
            </View>
          </View>
        }))}
      </View>
    }
  </View>)
};

class TimeScreenClass extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.currentIndex = 0;
    this.state = {
      loadingWeeks: true,
      weeks: [],
      loadQueue: []
    }
  }

  loadWeeksForDate = (momentDate) => {
    this.setState({
      loadingWeeks: true,
    }, () => {
      setTimeout(() => {
        const startDay = moment(momentDate.day(1));
        const endDay = moment(momentDate.day(7));
        const startingRange = moment.range(startDay, endDay);
        let forwardWeeks = [{
          range: startingRange,
        }];
        let backwardWeeks = [];
        for (let i = 0; i < WEEKS_TO_LOAD; i++) {
          forwardWeeks.push({
            range: moment.range(moment(startingRange.start).add(i * 7 + 7, 'days'), moment(startingRange.end).add(i * 7 + 7, 'days'))
          });
          backwardWeeks.push({
            range: moment.range(moment(startingRange.start).add((i - 1) * 7 - (WEEKS_TO_LOAD - 1) * 7, 'days'), moment(startingRange.end).add((i - 1) * 7 - (WEEKS_TO_LOAD - 1) * 7, 'days'))
          });
        }
        console.log(forwardWeeks);
        console.log(backwardWeeks);
        const finalWeeks = forwardWeeks.concat(backwardWeeks);
        this.setState({
          loadingWeeks: false,
          weeks: finalWeeks,
          loadQueue: finalWeeks.map(() => 0),
        })
      }, 0);
    });
  };

  componentDidMount() {
    this.loadWeeksForDate(moment());
  }

  loadHandle = (i) => {
    let loadQueue = this.state.loadQueue;
    loadQueue[i] = 1;
    this.setState({
      loadQueue
    })
  };

  onMomentumScrollEnd = (e, state, context) => {
    console.log(state.index);
    if (state.index == WEEKS_TO_LOAD || state.index == (WEEKS_TO_LOAD + 1)) {
      console.log("RELOAD");
      console.log();
      this.loadWeeksForDate(moment(this.state.weeks[state.index].range.start));
    }
  };

  render() {
    const { loadingWeeks } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{height: 65, backgroundColor: '#cde6d9'}}>
          {loadingWeeks ? <View style={styles.loadingWeeks}><ActivityIndicator /></View> :
            <Swiper loadMinimal loadMinimalSize={1} showsButtons={false}
                    showsPagination={false} loop={true}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}>
              {this.state.weeks.map((week, weekCounter) => <WeekRenderer
                loadHandle={this.loadHandle}
                loaded={!!this.state.loadQueue[weekCounter]}
                week={week}
                index={weekCounter}
                key={week.range.start.format('YYYY-MM-DDDD')}
              />)}
            </Swiper>
          }
        </View>
      </View>
    );
  }
}

export default TimeScreen = connect(({ home }) => {
  return {}
})(TimeScreenClass);