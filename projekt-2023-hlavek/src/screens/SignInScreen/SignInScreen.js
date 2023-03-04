import { View, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";
import {useNavigation} from '@react-navigation/native'

const SignInScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  
  
  const onSignUpPressed = () => {
    console.warn("Sign up!")
    navigation.navigate('SignUp')
  }
  
  const onSignInPressed = () => {
    console.warn("Sign in")
    //validate
    
    // navigation.navigate('SignIn')  || PŘEJDE DO APLIKACE
  }
  
  const onForgotPasswordPressed = () => {
    console.warn("Forgot password")
    navigation.navigate("ForgotPassword")
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.banner, {height: height * 0.2}]}>Vítej neznámý uživateli!</Text>
        
        <CustomInput
          placeholder="E-mail"
          value={email}
          setValue={setEmail}
        />
        
        <CustomInput
          placeholder="Heslo"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        
        <CustomButton 
          text="Přihlasit se"
          onPress={onSignInPressed}
        />
        
        <CustomButton 
          text="Zapomněl si heslo?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        
        <CustomButton 
          text="Nemáš účet? Zaregistruj se"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    banner:{
      width: '70%',
      maxWidth: 400,
      maxHeight: 700,
      fontSize: 36,
      fontWeight: 'medium',
      textAlign: 'center',
      color: "white",
      marginTop: 100
    },
    root: {
      alignItems: 'center',
      padding: 20,      
    }
});

export default SignInScreen