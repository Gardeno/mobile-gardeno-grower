import { StatusBar } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export const centeredContainer = {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const centeredRow = {
  flex: 1, alignItems: 'center', justifyContent: 'center'
};

export const LIGHT_YELLOW_COLOR = '#F4E04D';
export const YELLOW_COLOR = '#F2ED6F';
export const LIGHT_GREEN_COLOR = '#CEE397';
export const MIDDLE_GREEN_COLOR = '#8DB1AB';
export const DARK_GREEN_COLOR = '#587792';

export const RED_COLOR = '#DB3236';
export const GREEN_COLOR = 'rgb(119, 188, 31)';
export const GREY_COLOR = '#CBC7CC';
export const BLUE_COLOR = '#00A1DF';

export const STATUS_BAR_HEIGHT = (StatusBar.currentHeight || ifIphoneX(35, 20));
export const BOTTOM_BAR_HEIGHT = ifIphoneX(10, 0);

export const ORANGES = [
  '#FFA176',
  '#f16321',
  '#C54409',
];