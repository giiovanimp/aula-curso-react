import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button } from "native-base";
import DetailsScreen from './components/detailsScreen';

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
    cursos: [],
    isLoading: true
  }

  componentDidMount = async () => {
    const urlCursoDetalhado = 'http://104.248.133.2:7001/cursos';
    const response = await fetch(urlCursoDetalhado);
    const responseParsead = await response.json();

    this.setState({ cursos: responseParsead, isLoading: false });

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {this.state.cursos.map(curso => {
          return (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Second', { id: curso.id })}
              key={curso.nome}
              style={{
                flexDirection: 'row',
                padding: 15,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
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

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Second: {
    screen: DetailsScreen
  }
});

export default createAppContainer(AppNavigator);
