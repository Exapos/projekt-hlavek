import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";
import {useNavigation} from '@react-navigation/native'


const ForgotPasswordScreen = () => {

  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  
  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate("SignIn")
    
  }
  
  const onSendPressed = () => {
    console.warn("On confrimg pressed!")
    navigation.navigate("NewPassword")
  }

    
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Restartuj si své heslo!</Text>
        
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
     
        <CustomButton 
          text="Potvrdit"
          onPress={onSendPressed}
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

export default ForgotPasswordScreen