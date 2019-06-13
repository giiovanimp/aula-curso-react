import React from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Cursos',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    cursos: []
  }

  componentDidMount = async () => {
    const urlCursos = 'http://104.248.133.2:7001/cursos'
    const response = await fetch(urlCursos);
    const responseParsed = await response.json();
    
    this.setState({ cursos: responseParsed });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.cursos.map(curso => {
          return (
            <TouchableOpacity
              onPress={() => Alert.alert('Curso ' + curso.id)}
              key={curso.nome}
              style={{
              flexDirection: 'row',
              padding: 15,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              alignItems: 'center'
              }}>
              <Text>{curso.id}</Text>
              <Text style={{ marginLeft: 15}}>{curso.nome}</Text>
              {/* <Button></Button> */}
            </TouchableOpacity>
          )
        })}
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
      <View style={{ flex: 1 }}>
        <Text>
          {this.state.cursos.map(curso => {
            return (
              <View key={curso.id}>
                <Text>{curso.id}</Text>
                <Text>{curso.nome}</Text>
              </View>
            )
          })}
        </Text>
        <Text>{this.state.cursos.length > 0 && this.state.cursos[0].id}</Text>
        <Text>{this.state.cursos.length > 0 && this.state.cursos[0].nome}</Text>
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
