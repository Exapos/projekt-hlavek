import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { useEffect } from "react";
import CustomInput from '../../components/CustomInput/CustomInput'
import React, { useState } from 'react'
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from '../../Firebase/firebase';

const ConfirmEmailScreen = () => {
  const auth = getAuth();
  var user = auth.currentUser;
  const navigation = useNavigation();
  
  const helper = async () => {
    await user.reload();
    user = await auth.currentUser;
    
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        console.log("  Verified: " + user.emailVerified)
        
        if (user.emailVerified) {
          console.log("Vyborně jsi ověřený teď te teleport odnese zpět")
          navigation.navigate('SignIn')    
        } else {
          console.log("Stále nejsi ověřený, pokuĎ ti nepřišel e-mail klikni na Resend")    
        }
        console.warn("On CONFIRM pressed!")
      })
  }
}

  const { control, handleSubmit, formState: { errors }, watch } = useForm();

  const handleConfirm = () => {

    navigation.navigate('SignIn')
  }

  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate('SignIn')
  }

  const onConfirmPressed = () => {    
    ConfirmEmailScreen();
    console.warn("On CONFIRM pressed!")
  }

  const onResendPressed = () => {
    console.warn("On resend pressed!")
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.info("Email byl poslán")
      })
    const user = userCredentials.user;
    console.log(user)
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Opravdu existuješ?</Text>

        <CustomButton
          text="Potvrdit"
          onPress={helper}
        />

        <CustomButton
          text="Zpět do přihlašen!"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
        <CustomButton
          text="Poslat znovu kód!"
          onPress={onResendPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginVertical: 10,
  },
  link: {
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

export default ConfirmEmailScreen