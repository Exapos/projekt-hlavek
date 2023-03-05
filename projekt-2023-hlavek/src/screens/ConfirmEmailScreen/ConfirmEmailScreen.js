import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from "react";
import CustomInput from '../../components/CustomInput/CustomInput'
import React from 'react'
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { getAuth, sendEmailVerification, onIdTokenChanged } from "firebase/auth";
import firebase from '../../Firebase/firebase';

const ConfirmEmailScreen = () => {
  const [showText, setShowText] = useState(false);

  const auth = getAuth();
  const navigation = useNavigation();

  // Set up the onIdTokenChanged listener
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        // Refresh the user token
        const token = await user.getIdToken();
        // Do something with the new token, such as updating the UI
        console.group("USER-TOKEN:")
        console.info(`First 16: ${token.substring(0,16)}`);
        console.info(`Last 16: ${token.slice(-16)}`);
        console.groupEnd()        
      }
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const helper = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      console.group('Uživatel');
      console.info("Username: " + auth.currentUser.displayName);
      console.info("E-mail: " + auth.currentUser.email);
      console.info("Je učet verified?: " + auth.currentUser.emailVerified);
      console.info("UID uživatele: " + auth.currentUser.uid);    
      console.groupEnd();
      if (user.emailVerified) {
        console.info("Vyborně jsi ověřený teď te teleport odnese zpět")
        navigation.navigate('SignIn')
        setShowText(false);
      } else {
        setShowText(true);       
        console.error("Stále nejsi ověřený, pokuď ti nepřišel e-mail klikni na Resend")
      }
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
    console.group('Uživatel stiskl resend emailu:');
    console.info("Username: " + auth.currentUser.displayName);
    console.info("E-mail: " + auth.currentUser.email);
    console.info("Je učet verified?: " + auth.currentUser.emailVerified);
    console.info("UID uživatele: " + auth.currentUser.uid);    
    console.groupEnd();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.warn("Email byl poslán")
      }).catch((err)=>(console.log(err)))
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Ověření mailu!</Text>
        {showText && <Text style={styles.err}>Stále nejsi ověřený! Zkus to znovu!</Text>}

        <CustomButton
          text="Ověřit"
          onPress={helper}
        />
        <CustomButton
          text="Poslat znovu kód!"
          onPress={onResendPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Zpět na přihlašení!"
          onPress={onSignInPressed}
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
  err:{
    fontSize: 24,
    color: "red",
    textAlign: 'center',   
  },

});

export default ConfirmEmailScreen