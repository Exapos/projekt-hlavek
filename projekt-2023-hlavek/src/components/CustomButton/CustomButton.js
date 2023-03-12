import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
  return (
    <Pressable onPress={onPress}
        style={[styles.container, styles[`container_${type}`]]}
    >
      <Text
        style={[styles.text, styles[`text_${type}`]]}
      >{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {     
        width: 350,
        height: 70,
        padding: 15,
        borderRadius: 25,
        marginVertical: 10,
        alignItems: 'center',
    },
    
    container_PRIMARY: {
        backgroundColor: '#347757',  
    },
    container_SECONDARY: {
      borderColor:'#BB5E96',
      borderWidth :2,
    }, 
    container_TERTIARY: {   
    },   
    text: {  
        fontWeight: 'bold',
        color: "white",   
        textAlign: 'center',
        fontSize: 26,  
    },
    text_SECONDARY: {
      color: '#BB5E96',
  },
    text_TERTIARY: {
        color: '#652C47',
        fontSize: 20,
    },
})

export default CustomButton
