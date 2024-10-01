import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { firestore } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarEstrelas({navigation}) {

    const [nomeEstrela, setNomeEstrela] = useState(null);
    const [constelacaoEstrela, setconstelacaoEstrela] = useState(null);

    async function addEstrela() {
        try {
            const docRef = await addDoc(collection(firestore, 'Stars'), {
                nomeEstrela: nomeEstrela,
                constelacaoEstrela: constelacaoEstrela,
                
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Registros cadastrados com sucesso")
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar . Por favor, tente novamente.");
        }
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}> Cadastre uma nova estrela</Text>
            </View>
            <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite o nome da estrela" onChangeText={setNomeEstrela} value={nomeEstrela} />
            <TextInput style={estilo.input} placeholder="Qual a constelacao dessa estrela?" onChangeText={setconstelacaoEstrela} value={constelacaoEstrela} />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={() => {
                    addEstrela();
                }}>
                <Text style={estilo.btntxtenviar}> Pronto </Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
        padding: 20,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        borderRadius: 8,
        borderColor: '#dcdce6',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    btnenviar: {
        backgroundColor: '#6a9ae2',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 20,
    },
    btntxtenviar: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
});
