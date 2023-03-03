import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput 
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
      />

    </View>
  )
}

const styles = StyleSheet.create({
     container: {
     backgroundColor: '#D9D9D9',
     width: 350,
     height: 70,
 
     borderColor: 'grey',
     borderWidth: 1,
     borderRadius: 25,
     
     paddingHorizontal: 10,
     marginVertical: 20,
     

     alignItems: 'center'
     
     },
     input: {
        textAlign: 'center',
        width: 350,
        height: 70,
        borderRadius: 25,
        
     },
})

export default CustomInput