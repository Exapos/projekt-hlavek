import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, {useState} from 'react'
import  CustomButton  from "../../components/CustomButton/CustomButton";

const ConfirmEmailScreen = () => {

  const [code, setCode] = useState('');

  
  const onSignInPressed = () => {
    console.warn("Sign in")
  }
  
  const onConfirmPressed = () => {
    console.warn("On confrimg pressed!")
  }
  
  const onResendPressed = () => {
    console.warn("On resend pressed!")
  }

    
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Opravdu existuješ?</Text>
        
        <CustomInput
          placeholder="Zadej ověřovací kód"
          value={code}
          setValue={setCode}
        />
     
        <CustomButton 
          text="Potvrdit"
          onPress={onConfirmPressed}
        />
        
        <CustomButton 
          text="Pošlu ti znova kód!"
          onPress={onResendPressed}
          type="SECONDARY"
        />
              
        <CustomButton 
          text="Zpět do přihlašen!"
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

export default ConfirmEmailScreen