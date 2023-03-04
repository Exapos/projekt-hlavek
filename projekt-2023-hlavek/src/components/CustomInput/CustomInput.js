import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <>
        <View style={[styles.container, {borderColor: error ? 'red' : 'grey'},{borderWidth: error ? 6 : 1}]}>
          <TextInput value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={[styles.input, {}]}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {error && (
          <Text style={{color: '#E0115F', alignSelf: 'stretch', fontWeight: 'medium', fontSize: 18}}>{error.message || 'Error'}</Text>
        )}
        </>
      )}
    />
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