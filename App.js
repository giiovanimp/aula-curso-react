import React from "react";
import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
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

class DetailsScreen extends React.Component {
  
  state = {
    cursoDetalhado: [],
    alunosCadastrados: [],
    isLoading: true
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const idCurso = navigation.getParam('id');

    const urlCursoDetalhado = 'http://104.248.133.2:7001/cursos/' + idCurso;
    const response = await fetch(urlCursoDetalhado);
    const responseParsead = await response.json();

    const urlAlunosInscritos = 'http://104.248.133.2:7001/cursos/' + idCurso + '/alunos-inscritos';
    const responseAlunos = await fetch(urlAlunosInscritos);
    const responseAlunosParsead = await responseAlunos.json();

    this.setState({ cursoDetalhado: responseParsead[0],
      alunosCadastrados: responseAlunosParsead,
      isLoading: false });
  }

  static navigationOptions = {
    title: 'Detalhes',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

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
      <View style={{ flex: 1, backgroundColor: '#eee',  padding: 20}}>
        <View style={{ backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 12 }}>
          <Text>Id: {this.state.cursoDetalhado.id}</Text>
          <Text>Curso: {this.state.cursoDetalhado.nome}</Text>
          <Text>Professor: {this.state.cursoDetalhado.professor}</Text>
          <Text>Local: {this.state.cursoDetalhado.local}</Text>
        </View>

        <View style={{ marginTop: 10, backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 12 }}>
          <View style={{backgroundColor: '#bbb', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 10}}>
            <Text>Alunos Cadastrados</Text>
          </View>
          <View style={{ flex: 1 }}>
            {this.state.alunosCadastrados.map(aluno => {
              return (
                <View
                  key={aluno.nome}
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    alignItems: 'center'
                  }}>
                  <Text style={{ marginLeft: 15, fontSize: 22 }}> {aluno.id}</Text>
                  <Text style={{ marginLeft: 15, fontSize: 22 }}>{aluno.nome}</Text>
                </View>
              )
            })}
          </View>
        </View>
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
