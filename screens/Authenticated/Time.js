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
import {
  setSelectedDate,
  setWeekPageByIndex,
  setDayPageByIndex
} from '../../actions/time';
import { STATUS_BAR_HEIGHT } from '../../shared/styles';

import TimeHeader from './TimeHeader';

const moment = extendMoment(Moment);

const WEEKS_TO_LOAD = 10;

class WeekPageComponent extends React.Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    weekPages: PropTypes.array.isRequired,
  };

  render() {
    const { page, weekPages } = this.props;
    return <View style={{flex: 1}}>
      <Text>{weekPages[page]}</Text>
      <Text>Week {page}</Text>
    </View>
  }

}

const WeekPage = connect(({ time }) => {
  return {
    weekPages: time.weekPages,
  }
})(WeekPageComponent);

class DayPageComponent extends React.Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    dayPages: PropTypes.array.isRequired,
  };

  render() {
    const { page, dayPages } = this.props;
    console.log('rendering day/page ', page);
    return <View style={{flex: 1}}>
      <Text>{dayPages[page]}</Text>
      <Text>Day {page}</Text>
    </View>
  }

}

const DayPage = connect(({ time }) => {
  return {
    dayPages: time.dayPages,
  }
})(DayPageComponent);

class WeekSwiper extends React.PureComponent {

  render() {

    console.log('RENDERING');

    return <Swiper ref={this.props.swiperRef}
                   showsButtons={false} showsPagination={false} loop={true}
                   onScrollBeginDrag={this.props.onDraggedWeek}
                   onMomentumScrollEnd={this.props.onScrollEndWeek}>
      <View style={{flex: 1}}>
        {this.props.pageType === 'week' ? <WeekPage page={0}/> : <DayPage page={0}/>}
      </View>
      <View style={{flex: 1}}>
        {this.props.pageType === 'week' ? <WeekPage page={1}/> : <DayPage page={1}/>}
      </View>
      <View style={{flex: 1}}>
        {this.props.pageType === 'week' ? <WeekPage page={2}/> : <DayPage page={2}/>}
      </View>
    </Swiper>
  }

}

class TimeScreenClass extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.weekIndex = 0;
    this.dayIndex = 0;
  }

  weekSwiperRef = (ref) => {
    this.weekSwiper = ref;
  };

  _getSwiperIndicies = (previousSwiperIndex, swiperState) => {
    let currentIndex, nextIndex, previousIndex, direction;
    if (swiperState.index === swiperState.total - 1 && previousSwiperIndex === 0) {
      // Backward but from beginning (looped)
      currentIndex = swiperState.total - 1;
      nextIndex = 0;
      previousIndex = swiperState.total - 2;
      direction = -1;
    } else if (swiperState.index === 0 && previousSwiperIndex === swiperState.total - 1) {
      // Forward but from end (looped)
      currentIndex = 0;
      nextIndex = 1;
      previousIndex = swiperState.total - 1;
      direction = 1;
    } else if (swiperState.index === swiperState.total - 1 && previousSwiperIndex === swiperState.total - 2) {
      // Forward but to end
      currentIndex = swiperState.total - 1;
      nextIndex = 0;
      previousIndex = swiperState.total - 2;
      direction = 1;
    } else if (swiperState.index === 0 && previousSwiperIndex === 1) {
      // Backward but to beginning
      currentIndex = 0;
      nextIndex = 1;
      previousIndex = swiperState.total - 1;
      direction = -1;
    } else {
      // Generic forward/backward item
      currentIndex = swiperState.index;
      nextIndex = swiperState.index + 1;
      previousIndex = swiperState.index - 1
      direction = (swiperState.index > previousSwiperIndex) ? 1 : -1;
    }
    if (nextIndex >= swiperState.total) {
      nextIndex = 0;
    }
    if (previousIndex < 0) {
      previousIndex = swiperState.total - 1;
    }
    return {
      current: currentIndex,
      next: nextIndex,
      previous: previousIndex,
      direction,
    }
  };

  onDraggedWeek = () => {
    this.draggingWeek = true;
  };

  onScrollEndWeek = (e, state, context) => {
    if (this.draggingWeek) {
      const weekIndicies = this._getSwiperIndicies(this.weekIndex, this.weekSwiper.state);
      const dayIndicies = this._getSwiperIndicies(this.dayIndex, this.daySwiper.state);
      const setDayIndex = (weekIndicies.direction === 1) ? dayIndicies.next : dayIndicies.previous;
      const newSelectedDate = moment(this.props.dayPages[dayIndicies.current], 'YYYY-MM-DD').add(weekIndicies.direction * 7, 'days').format('YYYY-MM-DD');
      this.props.dispatch(setSelectedDate(newSelectedDate));
      this.props.dispatch(setDayPageByIndex(setDayIndex, newSelectedDate));
      this.daySwiper.scrollBy(weekIndicies.direction, true);
    }
    this.weekIndex = state.index;
    this.draggingWeek = false;
    // Update the week swipers since the day has been updated
    const finalWeekIndicies = this._getSwiperIndicies(this.weekIndex, this.weekSwiper.state);
    const currentWeekDate = moment(this.props.weekPages[finalWeekIndicies.current], 'YYYY-MM-DD');
    this.props.dispatch(setWeekPageByIndex(finalWeekIndicies.next, currentWeekDate.clone().add(7, 'days').format('YYYY-MM-DD')));
    this.props.dispatch(setWeekPageByIndex(finalWeekIndicies.previous, currentWeekDate.clone().add(-7, 'days').format('YYYY-MM-DD')));
  };

  onScrollEndDay = (e, state, context) => {
    if (this.draggingDay) {
      const dayIndicies = this._getSwiperIndicies(this.dayIndex, this.daySwiper.state);
      const newSelectedDate = moment(this.props.dayPages[dayIndicies.current], 'YYYY-MM-DD');
      this.props.dispatch(setSelectedDate(newSelectedDate.format('YYYY-MM-DD')));
      const fromSelectedDateIndex = (dayIndicies.direction === 1) ? dayIndicies.previous : dayIndicies.next;
      const fromSelectedDate = moment(this.props.dayPages[fromSelectedDateIndex], 'YYYY-MM-DD');
      if (newSelectedDate.isoWeek() !== fromSelectedDate.isoWeek()) {
        this.weekSwiper.scrollBy(dayIndicies.direction, true);
      }
    }
    this.dayIndex = state.index;
    this.draggingDay = false;
    // Update the day swipers since the day has been updated
    const finalDayIndicies = this._getSwiperIndicies(this.dayIndex, this.daySwiper.state);
    const currentDayDate = moment(this.props.dayPages[finalDayIndicies.current], 'YYYY-MM-DD');
    this.props.dispatch(setDayPageByIndex(finalDayIndicies.next, currentDayDate.clone().add(1, 'days').format('YYYY-MM-DD')));
    this.props.dispatch(setDayPageByIndex(finalDayIndicies.previous, currentDayDate.clone().add(-1, 'days').format('YYYY-MM-DD')));
  };

  daySwiperRef = (ref) => {
    this.daySwiper = ref;
  };

  onDraggedDay = () => {
    this.draggingDay = true;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TimeHeader navigation={this.props.navigation}/>
        <View style={{marginTop: STATUS_BAR_HEIGHT + 50, height: 65, backgroundColor: '#cde6d9'}}>
          <WeekSwiper pageType="week" swiperRef={this.weekSwiperRef}
                      onDraggedWeek={this.onDraggedWeek}
                      onScrollEndWeek={this.onScrollEndWeek}/>
        </View>
        <View style={{flex: 1}}>
          <WeekSwiper pageType="day" swiperRef={this.daySwiperRef} onDraggedWeek={this.onDraggedDay}
                      onScrollEndWeek={this.onScrollEndDay}/>
        </View>
      </View>
    );
  }
}

export default TimeScreen = connect(({ time }) => {
  return {
    dayPages: time.dayPages,
    weekPages: time.weekPages,
  }
})(TimeScreenClass);