import React, { Component } from "react";
import { View, Text, ActivityIndicator, Button, ScrollView } from "react-native";
import styles from './styles/styles';

export default class DetailsScreen extends Component {

  state = {
    cursoDetalhado: [],
    alunosCadastrados: [],
    isLoading: true,
    idCurso: null
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const idCurso = navigation.getParam('id');

    this.setState({ idCurso: idCurso });

    const urlCursoDetalhado = 'http://104.248.133.2:7001/cursos/' + idCurso;
    const response = await fetch(urlCursoDetalhado);
    const responseParsead = await response.json();

    const urlAlunosInscritos = 'http://104.248.133.2:7001/cursos/' + idCurso + '/alunos-inscritos';
    const responseAlunos = await fetch(urlAlunosInscritos);
    const responseAlunosParsead = await responseAlunos.json();

    this.setState({
      cursoDetalhado: responseParsead[0],
      alunosCadastrados: responseAlunosParsead,
      isLoading: false
    });
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
      <ScrollView style={styles.main}>
        <View style={styles.infoBox}>
          <View style={styles.titleBox}>
            <Text>Curso</Text>
          </View>
          <Text>Id: {this.state.cursoDetalhado.id}</Text>
          <Text>Curso: {this.state.cursoDetalhado.nome}</Text>
          <Text>Professor: {this.state.cursoDetalhado.professor}</Text>
          <Text>Local: {this.state.cursoDetalhado.local}</Text>
        </View>

        <View style={styles.studentsBox}>
          <View style={styles.titleBox}>
            <Text>Alunos Cadastrados</Text>
          </View>
          {this.state.alunosCadastrados.map(aluno => {
            return (
              <View
                key={aluno.id}
                style={styles.studentsLine}>
                <Text style={styles.studentsDesription}>{aluno.id}</Text>
                <Text style={styles.studentsDesription}>{aluno.nome}</Text>
              </View>
            )
          })}
        </View>
        <Button 
          onPress={() => this.props.navigation.navigate('CreateScreen', { id: this.state.idCurso })}
          title="Cadastrar Aluno"
          color='#841584'
        />
      </ScrollView>
    )
  }

  onCadastrarAluno() {
    this.props.navigation.navigate('CreateScreen');
  }
}
