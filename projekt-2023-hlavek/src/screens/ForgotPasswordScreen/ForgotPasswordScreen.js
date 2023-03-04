import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";
import {useNavigation} from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase from '../../Firebase/firebase';

const ForgotPasswordScreen = () => {

  const auth = getAuth();

  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  
  const changePassword = (email) => {
    sendPasswordResetEmail(auth, email)
    .then(()=> {
      console.log("Email has been sent to reset")
      setShowText(false);
      setShowText2(true); 
    }).catch((error) => {
      console.log(error)
      setShowText(true);
      setShowText2(false);  
    })
  }

  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate('SignIn');
  }
  
  const onSendPressed = (data) => {
    console.warn("On confrimg pressed!");
     changePassword(data.email)
  }
   
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Restartuj si své heslo!</Text>
        {showText && <Text style={styles.err}>Zadaný e-mail nebyl nalezen. Zkuste to prosím znovu.</Text>}
        {showText2 && <Text style={styles.sent}>Na zadaný e-mail byl poslán odkaz. Prosím zkontrolujte si e-mail.</Text>}    
        
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
          text="Zpět do přihlašení"
          onPress={onSignInPressed}
          type='TERTIARY'
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
    err:{
      fontSize: 24,
      color: "red",
      textAlign: 'center',   
    },
    sent:{
      fontSize: 24,
      color: "#BB5E96",
      textAlign: 'center',  
    }
    
});

export default ForgotPasswordScreen