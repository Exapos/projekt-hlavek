import { View, Text, StyleSheet, ScrollView, Linking, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function AddToDoModal(props) {
    let [todo, setTodo] = React.useState("");
    return (
        <View>
            <Text style ={styles.textT}>Přidej úkol</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Zadej název...'
                value={todo}
                onChangeText={setTodo} />
            <View style={styles.buttonContainer}>
                <Pressable style={[ styles.addDiscard, {backgroundColor:"#652C47"}]} 
                  onPress={props.onClose}>
                  <Text style={styles.buttonText}>ZRUŠIT</Text>
                </Pressable>
                <Pressable
                    style={ styles.addDiscard }
                    onPress={() => {
                        props.addToDo(todo);
                        setTodo("");
                        props.onClose();
                        }}>
                    <Text style={styles.buttonText}>PŘIDAT</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textT: {
      fontSize: 30,
      textAlign: 'center',
      alignSelf: 'center',
      backgroundColor: '#347757',
      borderWidth: 1,
      borderRadius: 20,
      marginVertical: 10,
      width: 250,
      height: 50,
    },
    textInput: {
        placeholderTextColor: "#555655",
        fontSize: 20
    },
    buttonText: {
      textAlign: 'center'
    },
    addDiscard:{
      backgroundColor: '#347757',
      textAlign: "center",
      justifyContent: "center",
      width: 125,
      height: 30,
      borderRadius: 10,
      marginHorizontal: 5

    },
    buttonContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 15,
    }
})