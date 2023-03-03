import { View, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  onSignUpPressed
  
  const onSignUpPressed = () => {
  console.warn("Sign up!")
  }
  
  const onSignInPressed = () => {
  console.warn("Sign in")
  }
  
  const onForgotPasswordPressed = () => {
  console.warn("Forgot password")
  }
  
  const {height} = useWindowDimensions();
  
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={[styles.banner, {height: height * 0.2}]}>Vítej neznámý uživateli!</Text>
        
        <CustomInput
          placeholder="Přihlašovací udaje"
          value={username}
          setValue={setUsername}
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
      color: "white"
    },
    root: {
      alignItems: 'center',
      padding: 20,      
    }
});

export default SignInScreen