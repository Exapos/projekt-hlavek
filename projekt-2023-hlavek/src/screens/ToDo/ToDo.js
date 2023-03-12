import { Button,View, Text, StyleSheet, ScrollView, Linking, Modal, SafeAreaView, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import InlineTextButton from '../../components/InlineTextButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import React, { useState, useEffect } from 'react';
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import AddToDoModal from '../../components/AddToDoModal/AddToDoModal'
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialIcons } from '@expo/vector-icons';
import firebase from "../../Firebase/Firebase"




const auth = getAuth();
const db = getFirestore();

const windowHeight = Dimensions.get('window').height;

const ToDo = ({ navigation }) => {
    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);
    let [toDos, setToDos] = React.useState([]);
    const [displayName, setDisplayName] = useState('neznámý uživateli');
    const [currentUser, setCurrentUser] = useState(null);
    
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          if(user) {
            console.log(user.displayName);
            setDisplayName(user.displayName)
          }
        });
        return unsubscribe;
      }, []);

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


    if (isLoading) {
        loadToDoList();
    }

    let logout = () => {
        signOut(auth).then(() =>{
            navigation.popToTop();
        });
    };

    let deleteToDo = async (toDoId) => {
        await deleteDoc(doc(db, "todos", toDoId));
        let updatedToDos = [...toDos].filter((item) => item.id != toDoId)
        setToDos(updatedToDos);
    };

    let checkToDoItem = (item, isChecked) => {

    };

    let ToDoItem = ({item}) =>{
        return (
            <View style ={styles.Container}>
                <BouncyCheckbox 
                    isChecked={item.completed}
                    size={30}
                    fillColor="#652C47"
                    unfillColor="#FFFFFF"
                    text={item.text}
                    iconStyle={{ borderColor: '#652C47' }}
                    textStyle={{ color: "white", fontSize: 22 }}
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
        return (
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
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, paddingTop: windowHeight * 0.020}}>
            <MaterialIcons name="logout" size={35} color="#652C47" style={{marginLeft: "auto"}} onPress={logout}/>  
                <Text style={styles.border}>Vítej {displayName} </Text>          
                {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}              
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 36 }}>
                    <CustomButton
                        text="+ Přidat úkol"
                        onPress={showContent}
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <AddToDoModal onClose={() => setModalVisible(false)} addToDo={addToDo} />
                    </View>
                </Modal>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Container: {
        marginTop: 12,
        flexDirection: 'row',
        marginLeft: 20,
        
        },
    border: {
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#347757',
        borderWidth: 3,
        borderRadius: 10,
        marginVertical: 10,
        width: 330,
        height: 70,
        color: "white",
        flexDirection: 'row',
        marginTop: "auto"
    },
    buttonDelete: {
        justifyContent: 'flex-end',
        fontSize: 30,
        size: 30,
        marginLeft: "auto"
    },
});

export default ToDo;