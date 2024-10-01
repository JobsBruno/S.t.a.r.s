import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarEstrelas({navigation, route}) {

    const id = route.params.id;

    const [nomeEstrela, setnomeEstrela] = useState(route.params.nomeEstrela);
    const [constelacaoEstrela, setconstelacaoEstrela] = useState(route.params.constelacaoEstrela);
    


    async function alterarEstrela(id, nomeEstrela, constelacaoEstrela) {
        try {
            await updateDoc(doc(collection(firestore, "Stars"), id), {
                nomeEstrela: nomeEstrela,
                constelacaoEstrela: constelacaoEstrela
            })
            Alert.alert("Aviso", "Estrela alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados da Estrela </Text>
                </View>
                <View>
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Qual o nome da estrela?" onChangeText={setnomeEstrela} value={nomeEstrela} />
                    <TextInput style={estilo.input} placeholder="De qual constelação é sua estrela?" onChangeText={setconstelacaoEstrela} value={constelacaoEstrela} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            alterarEstrela(id, nomeEstrela, constelacaoEstrela);
                        }}>
                        <Text style={estilo.btntxtenviar}>Alterar</Text>
                    </TouchableOpacity>
                </View>
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
            paddingHorizontal: 40,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 3,
            paddingTop: 10,
            paddingBottom: 10,
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
    