import React,{ useEffect, useState } from "react";
import { View,Text,StyleSheet,FlatList, TouchableOpacity, Alert, ImageBackground} from "react-native";
import { firestore } from "../Firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import crux from '../assets/crux.jpg';


export default function Home({navigation}) {
           
    const [estrelas, setEstrelas] = useState([]);

    async function deleteEstrela(id) {
        try{
            await deleteDoc(doc(firestore,'Stars',id));
            Alert.alert("A Estrela foi deletado.")
        }catch(error){
            console.error("Erro ao deletar.", error)
        }
    }
       
    useEffect(()=>{
        const unsubcribe = onSnapshot(collection(firestore,'Stars'),(querySnapshot)=>{
            const lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id});
            });
            setEstrelas(lista);
        });
        return () => unsubcribe();
    },[]);

    return(
        <ImageBackground source={crux} style={estilo.imgbck}>
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo} >Lista de Estrelas</Text>
            </View>
            <FlatList 
                data={estrelas}
                renderItem={({item})=>{
                    return(
                        <View style={estilo.estrelas}>
                            <TouchableOpacity onPress={()=>navigation.navigate("Alterar",{
                                id: item.id,
                                nomeEstrela: item.nomeEstrela,
                                constelacaoEstrela: item.constelacaoEstrela,
                            })}>
                                <View style={estilo.itens}>
                                    <Text> Estrela: <Text>{item.nomeEstrela}</Text></Text>
                                    <Text> constelacao: <Text>{item.constelacaoEstrela}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={()=>{deleteEstrela(item.id)}}>
                                <Text>X</Text>
                                </TouchableOpacity>    
                            </View>    
                        </View>    
                    );
                }}
            />
            <TouchableOpacity onPress={()=> navigation.navigate("Cadastrar")} style={estilo.btnCadas}>
                <Text style={estilo.cadas}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    titulo: {
        marginTop: 50,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center',
    },
    cadas: {
  
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center',
    },
    itens: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    btnCadas: {
        borderRadius: 15,
        padding: 10,
        bottom:45,
        backgroundColor:'gray',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        paddingTop: 10,
        paddingBottom: 10,
    },
    nomeEstrela: {
        fontSize: 13,
        color: '#555',
    },
    textoStar: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    estrelas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    botaodeletar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    addbutton: {
        backgroundColor: '#6a9ae2',
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        bottom: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imgbck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
