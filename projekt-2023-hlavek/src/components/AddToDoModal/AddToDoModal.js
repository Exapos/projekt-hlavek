import { View, Text, StyleSheet, ScrollView, Linking, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

export default function AddToDoModal(props) {
    let [todo, setTodo] = React.useState("");
    return (
        <View>
        <Text>přidání záležitosti</Text>
        <TextInput style={styles.textInput}     
            placeholder='Název'
            value={todo}
            onChangeText={setTodo} />
        <View>
          <Button title="Zrušit" onPress={props.onClose} />
          <Button title="Přidat" onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }} />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        placeholderTextColor: "#555655"
    }
})