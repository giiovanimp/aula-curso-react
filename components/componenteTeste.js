import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert, TouchableHighlight } from 'react-native';


export default class ComponenteTeste extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <View style={{ backgroundColor: 'red', width: 50, height: 50 }} >
        <TouchableHighlight>
          <Text>{this.props.exemplo}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
