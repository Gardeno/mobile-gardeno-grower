import React from 'react';
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
import { Ionicons } from '@expo/vector-icons';

import AnonymousHeader from './Header';

const styles = {
  baseTextInputWrapper: {
    backgroundColor: 'white',
    paddingTop: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingLeft: 14,
  }
};

const inputRowHeight = 45;

const BORDER_COLOR = '#323e48';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.refs.textInputEmailAddress.focus();
  }

  onTextInputSubmit = (textInputRef) => {
    return () => {
      if (textInputRef === 'textInputEmailAddress') {
        this.refs.textInputFirstName.focus();
      } else if (textInputRef === 'textInputFirstName') {
        this.refs.textInputLastName.focus();
      } else if (textInputRef === 'textInputLastName') {
        this.refs.textInputPassword.focus();
      } else if (textInputRef === 'textInputPassword') {
        this.onSubmit();
      }
    }
  };

  onSubmit = () => {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 500);
  };

  render() {

    const { isLoading } = this.state;

    return <View style={{flex: 1, backgroundColor: '#57b6b2'}}>
      <AnonymousHeader navigation={this.props.navigation} title={'Register'}/>
      <ScrollView style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0}}>
        <View style={{flex: 1, paddingLeft: 8, paddingRight: 8, paddingBottom: 8}}>
          <View style={{height: 90}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../images/logo-inline-with-text.png')} style={{height: 90, width: '100%'}} />
            </View>
          </View>
          <View
            style={Object.assign({}, styles.baseTextInputWrapper, {borderRadius: 4, borderColor: BORDER_COLOR, borderWidth: 1})}>
            <TextInput blurOnSubmit={false} onSubmitEditing={this.onTextInputSubmit('textInputEmailAddress')}
                       returnKeyType="next"
                       autoCorrect={false} autoCapitalize="none" keyboardType="email-address" textContentType="none"
                       ref="textInputEmailAddress" placeholder={'Email Address'} style={{fontSize: 14}}/>
          </View>
          <View style={{marginTop: 8}}>
            <View style={{height: inputRowHeight}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <View
                    style={Object.assign({}, styles.baseTextInputWrapper, {borderTopLeftRadius: 4, borderColor: BORDER_COLOR, borderWidth: 1, borderBottomWidth: 0})}>
                    <TextInput blurOnSubmit={false} onSubmitEditing={this.onTextInputSubmit('textInputFirstName')}
                               returnKeyType="next" autoCorrect={false} textContentType="none"
                               ref="textInputFirstName" placeholder={'First Name'} style={{fontSize: 14}}/>
                  </View>
                </View>
                <View style={{width: '50%'}}>
                  <View
                    style={Object.assign({}, styles.baseTextInputWrapper, {borderTopRightRadius: 4, borderColor: BORDER_COLOR, borderWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0})}>
                    <TextInput blurOnSubmit={false} onSubmitEditing={this.onTextInputSubmit('textInputLastName')}
                               returnKeyType="next" autoCorrect={false}
                               textContentType="none"
                               ref="textInputLastName" placeholder={'Last Name'} style={{fontSize: 14}}/>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={Object.assign({}, styles.baseTextInputWrapper, {borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderColor: BORDER_COLOR, borderWidth: 1})}>
              <TextInput blurOnSubmit={false} onSubmitEditing={this.onTextInputSubmit('textInputPassword')}
                         returnKeyType="go"
                         secureTextEntry={true} textContentType="none"
                         ref="textInputPassword" placeholder={'Create Password'} style={{fontSize: 14}}/>
            </View>
          </View>
          <View style={{marginTop: 8}}>
            <View style={{height: inputRowHeight}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: '#f09f54', borderRadius: 4, borderWidth: 1, borderColor: BORDER_COLOR}} onPress={this.onSubmit}>
                <View style={{position: 'absolute', left: 14, top: 0, bottom: 0}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>Submit Registration</Text>
                  </View>
                </View>
                <View style={{position: 'absolute', right: 14, top: 0, bottom: 0}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {isLoading ? <ActivityIndicator size="small" color={'white'} /> : <Ionicons name="ios-arrow-forward" size={20} color={'white'}/>}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  }

}

export default connect((state) => {
  return {}
})(Login);