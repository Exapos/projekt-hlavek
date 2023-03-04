import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";
import {useNavigation} from '@react-navigation/native'


const SignUpScreen = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [passwordRepeat, setPasswordReapeat] = useState('');  
  
  const navigation = useNavigation();
  
  
  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate('SignIn')
  }
  
  const onRegisteredPressed = () => {
  console.warn("Register")
    //Logika backendu
    navigation.navigate('ConfirmEmail')
  }
    
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Vytvoř si učet!</Text>
        
        <CustomInput
          placeholder="Uživatelské jméno"
          value={username}
          setValue={setUsername}
        />
        
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
        
        <CustomInput
          placeholder="Ještě jednou heslo"
          value={passwordRepeat}
          setValue={setPasswordReapeat}
          secureTextEntry
        />
        
        <CustomButton 
          text="Zaregistrovat se"
          onPress={onRegisteredPressed}
        />
        
        <text style={styles.text}>Zegistrovaním, souhlasíš s mými <text style={styles.link}>podmínkami</text>, které <text style={styles.link}>nejsou</text> nikde k nalezení.</text>
        
        <CustomButton 
          text="Máš účet? Přihlaš se"
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
      marginTop: 100
    },
    
});

export default SignUpScreen