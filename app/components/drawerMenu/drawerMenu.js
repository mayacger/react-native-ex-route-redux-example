import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './drawerMenu.style';


const DrawerMenu = (props) => {
  let select = () => props.switch(1, 'profileTab');
  return (
    <View style={styles.mainView}>
          <TouchableOpacity onPress={select} style={styles.menuItem}>
            <Text style={styles.menuItemText}>side</Text>
          </TouchableOpacity>
    </View>
  )
};

DrawerMenu.propTypes = {
  scenes: PropTypes.array,
  switch: PropTypes.func,
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  switch: (index, key) => dispatch(ownProps.navigate.navigateSwitch(index, key)),
});

export default connect(null, mapDispatchToProps)(DrawerMenu);
