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
import DrawerMenu from '../components/drawerMenu/drawerMenu'

import {
  // actions as NavigationExperimentalActions ,
  Router,
  RootScene,
  Scene,
  Schema,
  TabScene,
  DrawerScene,
} from 'react-native-ex-route-redux';


import Counter from '../components/counter';
import Page from '../components/page';
import Nested from '../components/nested';
import Profile from '../components/profile';


import icon from '../bullsEye@2x.png';
const tabIcon = (tab, index, key, selectedIndex) => {
  let color = index === selectedIndex ? 'rgba(0, 0, 255, 0.6)' : '#979797';

  return (
    <View index={index} key={key} style={{ flex: 1, alignItems: 'center' }}>
      {tab.tabIcon}
      <Text style={{ color }}>{tab.title}</Text>
    </View>
  );
};

const renderBackButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.pop());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>返回</Text>
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


const renderTitle = (props) => (
  <View style={styles.customTitleContainer}>
    <Text style={styles.customTitle}>
      {props.title}
    </Text>
  </View>
);



//Menu button
const renderLeftMenuButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.toggleLeftDrawer());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Menu</Text>
    </TouchableOpacity>
  );
};

const renderRightMenuButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.toggleRightDrawer());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>rightMenu</Text>
    </TouchableOpacity>
  );
};


class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    let headerStyle = {backgroundColor:"#F60"};
    let hidetabBarStyle = {height:0,overflow:'hidden',borderTopWidth:0};

    // 类型 type="Card" type="CardStack" 默认 NavigationCardStack
    const scenes = (
        <RootScene type="CardStack" leftMenuComponent={DrawerMenu} rightMenuComponent={DrawerMenu}>
          <Schema key="default" defaultheaderStyle={headerStyle} titleStyle={{ fontSize: 17, fontFamily: 'avenir', color: '#333', fontWeight: '400' }} icon={tabIcon} renderBackButton={renderBackButton} />
          <TabScene key="homeTab"  schema="default" title="Home" tabIcon={<Image source={icon} />} component={Page}   renderLeftButton={renderLeftMenuButton} renderRightButton={renderRightMenuButton} />
          <TabScene key="profileTab" schema="default" title="Profile" tabIcon={<Image source={icon} />} component={Counter}  renderLeftButton={renderLeftButton} renderRightButton={renderRightButton} renderTitle={renderTitle}/>
          <TabScene key="settingsTab" schema="default" title="Settings" tabIcon={<Image source={icon} />} component={Profile} />
          <Scene key="login" schema="default" component={Counter} title="Login" hideNavBar tabBarStyle={hidetabBarStyle} />
          <Scene key="page" schema="default" component={Page}  />
          <Scene key="nested" schema="default" component={Nested}  headerStyle={{backgroundColor:"green"}} />
        </RootScene>
      );



    return (
        <Router {...this.props}  scenes={scenes} />
    )
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
    actions: bindActionCreators(counterActions, dispatch),
    dispatch, //props 必须添加dispatch
  })
)(Root);
