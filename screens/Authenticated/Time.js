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
import { STATUS_BAR_HEIGHT, BOTTOM_BAR_HEIGHT } from '../../shared/styles';

import TimeHeader from './TimeHeader';

const moment = extendMoment(Moment);

const WEEKS_TO_LOAD = 10;

class WeekPageComponent extends React.Component {

  static propTypes = {
    selectedDate: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    weekPages: PropTypes.array.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
    dayPageData: PropTypes.object.isRequired,
  };

  _onPressDate = (newDate) => {
    return () => {
      this.props.onSelectedDate(newDate);
    }
  };

  render() {
    const { selectedDate, page, weekPages, dispatch, dayPageData } = this.props;
    const startDate = moment(weekPages[page], 'YYYY-MM-DD');
    const range = moment.range(startDate.clone().format('YYYY-MM-DD'), startDate.clone().add(7, 'days').format('YYYY-MM-DD'));
    return <View style={{flex: 1, flexDirection: 'row'}}>
      {(Array.from(range.by('day')).map((day, counter) => {
        let dayBackgroundStyle = { width: 32, height: 32, borderRadius: 16 };
        let dayTextStyle = { color: 'black' };
        const formattedDay = day.format('YYYY-MM-DD');
        if (formattedDay === selectedDate) {
          if (moment().format('YYYY-MM-DD') === formattedDay) {
            dayBackgroundStyle.backgroundColor = '#79dea8';
            dayTextStyle.color = 'white';
          } else {
            dayBackgroundStyle.backgroundColor = 'black';
            dayTextStyle.color = 'white';
          }
        }
        return <View style={{width: '14.28%', height: '100%'}} key={`day-${formattedDay}`}>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={this._onPressDate(formattedDay)}>
            <View style={dayBackgroundStyle}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={dayTextStyle}>{day.format('dddd')[0]}</Text>
              </View>
            </View>
            <Text style={{fontSize: 10, paddingTop: 4}}>
              {dayPageData[formattedDay] ? `${dayPageData[formattedDay].hours}` : '0:00'}
            </Text>
          </TouchableOpacity>
        </View>
      }))}
    </View>
  }

}

const WeekPage = connect(({ time }) => {
  return {
    selectedDate: time.selectedDate,
    weekPages: time.weekPages,
    dayPageData: time.dayPageData,
  }
})(WeekPageComponent);

class DayPageComponent extends React.Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    dayPages: PropTypes.array.isRequired,
    dayPageQuotes: PropTypes.array.isRequired,
    dayPageData: PropTypes.object.isRequired,
  };

  render() {
    const { page, dayPages, dayPageQuotes, dayPageData } = this.props;
    console.log(dayPageData);
    console.log(page);
    const dayPageDataEntry = dayPageData[dayPages[page]];
    console.log(dayPageDataEntry);
    if (dayPageDataEntry) {
      return <View style={{flex: 1, paddingBottom: 60 + BOTTOM_BAR_HEIGHT}}>
        <View style={{height: 100, backgroundColor: 'white', borderBottomColor: '#79dea8', borderBottomWidth: 1}}>
          <Text>{dayPageDataEntry.hours}</Text>
        </View>
      </View>;
    }
    const quote = dayPageQuotes[page];
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 + BOTTOM_BAR_HEIGHT}}>
      <Text style={{marginBottom: 15, padding: 15}}>
        {quote.quote}
      </Text>
      <Text>
        {quote.author}
      </Text>
    </View>;
  }

}

const DayPage = connect(({ time }) => {
  console.log(time);
  return {
    dayPages: time.dayPages,
    dayPageQuotes: time.dayPageQuotes,
    dayPageData: time.dayPageData,
  }
})(DayPageComponent);

class WeekSwiper extends React.PureComponent {

  render() {

    return <Swiper ref={this.props.swiperRef}
                   showsButtons={false} showsPagination={false} loop={true}
                   onScrollBeginDrag={this.props.onDraggedWeek}
                   onMomentumScrollEnd={this.props.onScrollEndWeek}>
      <View style={{flex: 1}}>
        {this.props.pageType === 'week' ? <WeekPage page={0} onSelectedDate={this.props.onSelectedDate}/> :
          <DayPage page={0}/>}
      </View>
      <View style={{flex: 1}}>
        {this.props.pageType === 'week' ? <WeekPage page={1} onSelectedDate={this.props.onSelectedDate}/> :
          <DayPage page={1}/>}
      </View>
      <View style={{flex: 1}}>
        {this.props.pageType === 'week' ? <WeekPage page={2} onSelectedDate={this.props.onSelectedDate}/> :
          <DayPage page={2}/>}
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

  onSelectedDateInWeek = (newDate) => {
    const dayIndicies = this._getSwiperIndicies(this.dayIndex, this.daySwiper.state);
    const currentlySelectedDate = moment(this.props.dayPages[dayIndicies.current], 'YYYY-MM-DD').format('YYYY-MM-DD');
    if (currentlySelectedDate === newDate) {
      return; //TODO : Possibly refresh
    }
    const direction = (currentlySelectedDate > newDate) ? -1 : 1;
    if (moment(newDate, 'YYYY-MM-DD').isoWeek() !== moment(currentlySelectedDate, 'YYYY-MM-DD').isoWeek()) {
      const weekStart = moment(newDate, 'YYYY-MM-DD').clone().startOf('isoWeek').format('YYYY-MM-DD');
      const weekIndicies = this._getSwiperIndicies(this.weekIndex, this.weekSwiper.state);
      this.props.dispatch(setWeekPageByIndex(direction === 1 ? weekIndicies.next : weekIndicies.previous, weekStart));
      this.weekSwiper.scrollBy(direction, true);
    }
    this.props.dispatch(setDayPageByIndex(direction === 1 ? dayIndicies.next : dayIndicies.previous, newDate));
    this.daySwiper.scrollBy(direction, true);
    this.props.dispatch(setSelectedDate(newDate));
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
        <TimeHeader navigation={this.props.navigation} onSelectedDate={this.onSelectedDateInWeek}/>
        <View style={{marginTop: STATUS_BAR_HEIGHT + 50, height: 65, backgroundColor: '#cde6d9', borderBottomColor: '#79dea8', borderBottomWidth: 1}}>
          <WeekSwiper pageType="week" swiperRef={this.weekSwiperRef}
                      onDraggedWeek={this.onDraggedWeek}
                      onScrollEndWeek={this.onScrollEndWeek}
                      onSelectedDate={this.onSelectedDateInWeek}/>
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