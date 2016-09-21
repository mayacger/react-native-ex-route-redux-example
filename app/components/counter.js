import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as counterActions from '../actions/counterActions';
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

class Counter extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { state, dispatch ,actions, navigate, parent} = this.props;
    let push = () => dispatch(navigate.push('/Applications', { title: 'Pushed Applications', data: 'Some data from the pushed page tab', parent: parent }));
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{state.count}</Text>
        <TouchableOpacity onPress={actions.increment} style={styles.button}>
          <Text>up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={actions.decrement} style={styles.button}>
          <Text>down</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={push}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Push Page</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect(state => ({
    state: state.counter,
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Counter);
