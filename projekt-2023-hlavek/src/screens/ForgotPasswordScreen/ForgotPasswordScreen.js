import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";
import {useNavigation} from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'


const ForgotPasswordScreen = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate('SignIn');
    
  }
  
  const onSendPressed = (data) => {
    console.warn(data);
    console.warn("On confrimg pressed!");
    navigation.navigate('NewPassword');
  }
   
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Restartuj si své heslo!</Text>
        
        <CustomInput
          name="email"
          placeholder="E-mail"
          control={control}
          rules={{
            required: 'E-mail je potřeba! Nezapoměn na něj',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Zadejte platný email',
            },
          }}
        />
     
        <CustomButton 
          text="Poslat"
          onPress={handleSubmit(onSendPressed)}
        />
              
        <CustomButton 
          text="Zpět do přihlašení!"
          onPress={onSignInPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    text:{
      color: 'white',
      marginVertical: 10,
    },
    link:{
      color: 'yellow'
    },
    root: {
      alignItems: 'center',
      padding: 20,      
    },
    title: {
      fontSize: 36,
      fontWeight: 'medium',
      textAlign: 'center',
      color: "white",
      marginTop: 25
    },
    
});

export default ForgotPasswordScreen