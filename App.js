import React from "react";
import { View, Text, Alert, TouchableHighlight, TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button } from "native-base";

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
    const urlCursos = 'http://104.248.133.2:7001/cursos';
    const response = await fetch(urlCursos);
    const responseParsead = await response.json();

    this.setState({ cursos: responseParsead });

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.cursos.map(curso => {
          return (
            <TouchableOpacity
              onPress={() => Alert.alert(`Clicamos no curso de index ${curso.id} que é o ${curso.nome}`)}
              key={curso.nome}
              style={{
                flexDirection: 'row',
                padding: 15,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                // justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ marginLeft: 15, fontSize: 22 }}> {curso.id}</Text>
              <Text style={{ marginLeft: 15, fontSize: 22 }}>{curso.nome}</Text>
              <Button>
              </Button>
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
