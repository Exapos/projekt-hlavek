import { View, Text, StyleSheet, ScrollView, Linking, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function AddToDoModal(props) {
    let [todo, setTodo] = React.useState("");
    return (
        <View>
            <View style={styles.textT}>
              <Text style={{ fontSize: 30, textAlign: 'center', alignSelf: 'center', color:"white"}}>Přidej úkol</Text>
            </View>

            <TextInput
              style={{ 
                fontSize: 20, 
                color: "white"
              }}
              placeholder='Zadej název...'
              placeholderTextColor='#555655'
              value={todo}
              onChangeText={setTodo} 
            />

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
      justifyContent: 'center',
      backgroundColor: '#347757',
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 50,
      width: 250,
      height: 50,
    },
    buttonText: {
      textAlign: 'center',
      color: "white"
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