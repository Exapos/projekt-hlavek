import { Button,View, Text, StyleSheet, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../../components/InlineTextButton';
import React, { useState } from 'react';
import {  getAuth} from "firebase/auth";
import firebase from '../../Firebase/firebase';
import AddToDoModal from '../../components/AddToDoModal/AddToDoModal'
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialIcons } from '@expo/vector-icons';


const auth = getAuth();
const db = getFirestore();


const ToDo = ({navigation}) => {
    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);
    let [toDos, setToDos] = React.useState([]);

    let loadToDoList = async () => {
        const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        let toDos = [];
        querySnapshot.forEach((doc) => {
            let toDo = doc.data();
            toDo.id = doc.id;
            toDos.push(toDo);
        });

        setToDos(toDos);
        setIsLoading(false);
    };


    if (isLoading){
        loadToDoList();
    }

    let logout = () => {
        signOut(auth).then(() =>{
            navigation.popToTop();
        });
    };

    let checkToDoItem = (item, isChecked) => {

    };

    let deleteToDo = async (toDoId) => {
        await deleteDoc(doc(db, "todos", toDoId));
        let updatedToDos = [...toDos].filter((item) => item.id != toDoId)
        setToDos(updatedToDos);
    };

    let ToDoItem = ({item}) =>{
        return (
            <View style ={styles.Container}>
                <BouncyCheckbox 
                    isChecked={item.completed}
                    size={20}
                    fillColor="#652C47"
                    unfillColor="#FFFFFF"
                    text={item.text}
                    iconStyle={{ borderColor: "purple" }}
                    textStyle={{ color: "black" }}
                    onPress={(isChecked) => {checkToDoItem(item, isChecked)}}
                />
                    <View style={styles.buttonDelete}>
                        <InlineTextButton text="Smazat" 
                        onPress={() => deleteToDo(item.id)} />
                    </View>
            </View>
        );
    };

    let showToDoList = () => {
        return(
            <FlatList
            data={toDos}
            renderItem={ToDoItem}
            keyExtractor={item => item.id} 
            />
        )
    };

    let showContent = () => {
        setModalVisible(true);
    };

    let addToDo = async (todo) => {
        let toDoToSave = {
            text: todo,
            completed: false,
            userId: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "todos"), toDoToSave);
        {
        toDoToSave.id = docRef.id;

        let updatedToDos = [...toDos];
        updatedToDos.push(toDoToSave);

        setToDos(updatedToDos);
        };
        console.log(docRef);
    };

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                <View style={styles.modalContainer}>
                    <AddToDoModal
                    onClose={() => setModalVisible(false)}
                    addToDo={addToDo}
                    />
                </View>
            </Modal>
            <MaterialIcons name="logout" size={32} color="#652C47" style={{marginLeft: "auto"}} onPress={logout}/>

            <Text style= {styles.Border}>ToDo </Text>
            {isLoading ? <ActivityIndicator size="large" /> : <>{showToDoList()}</>}

            <View style= {{position: "absolute", marginTop: 800, alignSelf: 'center'}}>
                <CustomButton
                text="+ Přidat záležitosti"
                onPress={showContent}
                />
            </View>
        </SafeAreaView>
    )
}

  const styles = StyleSheet.create({
    modalContainer: {
      marginTop: 100,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Container:{
        marginbottom: 20,
        flexDirection: 'row'

    },
    Border:{
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 0.3,
        backgroundColor: '#347757',
        borderWidth: 3,
        marginVertical: 10,
        width: 350,
        height: 70,
    },
    buttonDelete:{
        justifyContent: 'flex-end',
        fontSize: 30,
        size: 30,
        marginLeft: "auto"
    }

  });

  export default ToDo