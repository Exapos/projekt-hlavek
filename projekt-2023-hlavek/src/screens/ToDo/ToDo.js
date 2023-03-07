import { Button,View, Text, StyleSheet, ScrollView, Linking, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../../components/InlineTextButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import React, { useState } from 'react';
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import {  getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, emailVerified, currentUser, userId } from "firebase/auth";
import firebase from '../../Firebase/firebase';
import AddToDoModal from '../../components/AddToDoModal/AddToDoModal'
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
        setIsRefreshing(false);
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
                    size={25}
                    fillColor="purple"
                    unfillColor="#FFFFFF"
                    text={item.text}
                    iconStyle={{ borderColor: "purple" }}
                    onPress={(isChecked) => {checkToDoItem(item, isChecked)}}
                    />
                    <View>
                        <InlineTextButton text="Smazat" color="red" onPress={() => deleteToDo(item.id)} />
                    </View>
            </View>
        );
    };

    let showToDoList = () => {
        return(
            <FlatList
            data={toDos}
            renderItem={ToDoItem}
            keyExtractor={item => item.id} />
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
            <Text>ToDo</Text>
            <Button title="Přidat záležitosti" onPress={showContent}/>
            {isLoading ? <ActivityIndicator size="large"/> : <>{showToDoList()}</>}
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

    }
  });

  export default ToDo