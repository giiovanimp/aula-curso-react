import React from "react";
import { View, Text, Alert, TouchableHighlight } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    value: 1
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableHighlight
          style={{ height: 30, width: 30, backgroundColor: 'blue' }}
          onPress={() => this.props.navigation.navigate('Second', {
            valorDoState: this.state.value
          })}>
          <Text>asuauahsa</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Second',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View>
        <Text>Funcionando a navegação</Text>
        <TouchableHighlight style={{ height: 30, width: 30, backgroundColor: 'blue' }} onPress={() => Alert.alert('aushuash')}>
          <Text>asuauahsa</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Second: {
    screen: DetailsScreen
  }
});

export default createAppContainer(AppNavigator);
