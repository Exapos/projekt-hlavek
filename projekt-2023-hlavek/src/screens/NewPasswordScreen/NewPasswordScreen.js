import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";
import {useNavigation} from '@react-navigation/native'


const NewPasswordScreen = () => {

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const navigation = useNavigation();
  
  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate("SignIn")
    
  }
  
  const onSubmitPressed = () => {
    console.warn("On submit pressed!")
    //Dodělat
  }

    
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Restartuj si své heslo!</Text>
        
        <CustomInput
          placeholder="Kód z e-mailu"
          value={code}
          setValue={setCode}
        />
        <CustomInput
          placeholder="Nové heslo"
          value={newPassword}
          setValue={setNewPassword}
        />
     
        <CustomButton 
          text="Odeslat"
          onPress={onSubmitPressed}
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
      marginTop: 100
    },
    
});

export default NewPasswordScreen