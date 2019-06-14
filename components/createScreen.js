import React, { Component } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from './styles/styles';

export default class CreateScreen extends Component {

    state = {
        idCurso: null,
        nomeAluno: null
    }

    componentDidMount() {
        const { navigation } = this.props;
        const idCurso = navigation.getParam('id');
        this.setState({idCurso: idCurso})
    }

    render() {
        return (
            <View>
                <Text>Nome:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(nomeAluno) => this.setState({nomeAluno})}
                    value={this.state.nomeAluno}
                />
                <Button
                    onPress={this.onPressCadastrar}
                    title='Cadastrar'
                    disabled={this.state.nomeAluno == null || this.state.nomeAluno == ''}
                />
            </View>
        )
    }

    onPressCadastrar = async () => {
        const urlAlunosInscritos = 'http://104.248.133.2:7001/cursos/' + this.state.idCurso + '/alunos-inscritos';
        const nome = {nome: this.state.nomeAluno};
        const responseAlunos = await fetch(urlAlunosInscritos, {
            method: 'POST',
            body: JSON.stringify(nome),
            headers:{
            'Content-Type': 'application/json'
          }}).catch();
          debugger;
        if (responseAlunos.status == '200') {
            Alert.alert('Cadastrado com sucesso');
        }
    }
}