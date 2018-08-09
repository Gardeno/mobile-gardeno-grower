import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Platform, Image, Button, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import { toggleEdit } from '../../actions/home';

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  GridViewBlockStyle: {
    flex: 1,
    height: 125,
    margin: 0,
    padding: 0,
    marginBottom: 8,
  },

  GridViewInsideTextItemStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 30,
    borderTopWidth: 1,
    borderTopColor: '#468C98',
  },

  sectionHeader: {
    height: 20,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  }

});

const sounds = [
];

class EditButtonClass extends React.Component {

  onPress = () => {
    this.props.dispatch(toggleEdit());
  };

  render() {
    const { isEditing } = this.props;
    return <Button title={isEditing ? 'Done': 'Edit'} onPress={this.onPress}/>
  }

}

const EditButton = connect(({ home }) => {
  return {
    isEditing: home.isEditing,
  }
})(EditButtonClass);

class HomeScreenClass extends React.Component {

  static navigationOptions = ({ navigation, state }) => {
    console.log('state: ', state);
    return {
      title: 'Gardeno - Grower',
      headerLeft: <EditButton />,
      headerRight: (
        <TouchableOpacity
          style={{paddingRight: 8}}
          onPress={() => navigation.navigate('RecordSound')}
        >
          <Ionicons name="md-add" size={32}/>
        </TouchableOpacity>
      ),
    }
  };

  playItem = (item) => {
    return async() => {
      const soundObject = new Expo.Audio.Sound();
      try {
        await soundObject.loadAsync(item.path);
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.error(error);
      }
    }
  };

  render() {
    const { isEditing } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#476C9B'}}>
        {!isEditing && <View style={{height: 50}}>
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 8,}}>
            <Text style={{color: '#101419', fontWeight: 'bold',}}>Default Sounds</Text>
          </View>
        </View>}
        {!isEditing && <View style={styles.MainContainer}>
          <FlatList
            data={sounds}
            renderItem={({item, index}) => <View style={styles.GridViewBlockStyle} key={`item-${index}`}>
            <TouchableOpacity onPress={this.playItem(item)} style={{position: 'absolute', left: 8, top: 0, right: 8, bottom: 0, backgroundColor: '#ADD9F4', borderRadius: 4}}>
            <View style={{flex: 1, alignItems: 'center', paddingTop: 8}}>
            <Image source={item.imagePath} style={{width: 80, height: 80}} />
            </View>
            <View style={styles.GridViewInsideTextItemStyle}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text  onPress={() => {}} > {item.label} </Text>
              </View>
              </View>
            </TouchableOpacity>
            </View>}
            numColumns={2}
            keyExtractor={(item, index) => item.path}
          />
        </View>}
      </View>

    );
  }
}

export default HomeScreen = connect(({ home }) => {
  return {
    isEditing: home.isEditing,
  }
})(HomeScreenClass);