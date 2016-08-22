'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';

import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

import {
  // actions as NavigationExperimentalActions ,
  RouterEx,
  RootScene,
  Scene,
  Schema,
  TabScene,
} from 'react-native-ex-route-redux';


import Counter from '../components/counter';
import Page from '../components/page';

import icon from '../bullsEye@2x.png';
const tabIcon = (tab, index, key, selectedIndex) => {
  let color = index === selectedIndex ? 'rgba(0, 0, 255, 0.6)' : '#979797';

  return (
    <View index={index} key={key} style={{ flex: 1, alignItems: 'center' }}>

      <Image source={icon} />
      <Text style={{ color }}>{tab.title}</Text>
    </View>
  );
};

const renderBackButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.pop());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Back</Text>
    </TouchableOpacity>
  );
};

const renderLeftButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.modal('login', { title: 'Modal Login', data: 'Some data from the home tab',renderRightButton:modalPopButton }));

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Login</Text>
    </TouchableOpacity>
  );
};

const renderRightButton = () => {
  let handleNavigation = () => Alert.alert('Alert', 'You pressed the right button', [{ text: 'OK' }]);

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Alert</Text>
    </TouchableOpacity>
  );
};
const modalPopButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.modalPop());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>关闭</Text>
    </TouchableOpacity>
  );
};

/* eslint react/prop-types: 0 */
const renderTitle = (props) => (
  <View style={styles.customTitleContainer}>
    <Text style={styles.customTitle}>
      {props.title}
    </Text>
  </View>
);

class CounterApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    let hideHeader = {height:0,overflow:'hidden'};

    const scenes = (
        <RootScene type="tabs">
          <Schema key="default" titleStyle={{ fontSize: 17, fontFamily: 'avenir', color: '#333', fontWeight: '400' }} icon={tabIcon}  />
          <TabScene key="home"  schema="default" title="Home" iconName={<Text>HomeIcon</Text>} component={Page} renderLeftButton={renderLeftButton} renderRightButton={renderRightButton} renderTitle={renderTitle}  />
          <TabScene key="list" schema="default" title="list" iconName="listIcon" component={Counter}  />
          <TabScene key="me" schema="default" title="me" iconName="meIcon" component={Counter} />
          <Scene key="login" schema="default" component={Counter} title="Login" tabBarStyle={{backgroundColor:"#eee",height:0,overflow:'hidden',borderTopWidth:0}} />
          <Scene key="page" schema="default" component={Counter} />
          <Scene key="nested" schema="default" component={Counter} />
        </RootScene>
      );

    return (
        <RouterEx {...this.props}  scenes={scenes} />
      )
    // return (
    //   <Counter
    //     counter={state.count}
    //     {...actions} />
    // );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: Platform.OS === 'ios' ? 10 : 16,
  },
  customTitle: {
    color: 'white',
    fontSize: 14,
  },
  customTitleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default connect(state => ({
    state: state.counter,
    navState: state.navState,
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp);
