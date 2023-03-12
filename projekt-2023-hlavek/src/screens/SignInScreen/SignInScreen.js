import { View, Text, useWindowDimensions, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, { useState, useEffect } from 'react'
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import ToDo from '../ToDo/ToDo';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import firebase from "../../Firebase/Firebase"


const auth = getAuth();

const SignInScreen = () => {
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [displayName, setDisplayName] = useState('neznámý uživateli');

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors }, } = useForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if(user) {
        console.log(user.displayName);
        setDisplayName(user.displayName)
      }
    });
    return unsubscribe;
  }, []);

  const [currentUser, setCurrentUser] = useState(null);

  const onHandleSignIn = async (email, password) => {  
    if (currentUser && !currentUser.emailVerified) {
      console.log("Not verified")
      setShowText2(true);        
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success");
      setShowText(false)
      setShowText2(false);
      navigation.navigate("ToDo")
    } catch (err) {
      console.log(err);
      setShowText(true);
    }
  }

  const onSignUpPressed = () => {
    console.warn("Sign up!")
    navigation.navigate('SignUp')
  }

  const onSignInPressed = (data) => {
    onHandleSignIn(data.email, data.password)
  }

  const onForgotPasswordPressed = () => {
    console.warn("Forgot password")
    navigation.navigate("ForgotPassword")
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.banner, { height: height * 0.2 }]}>Vítej {displayName}!</Text>
        {showText && <Text style={styles.err}>Neplatné přihlašovací údaje. Zkuste to prosím znovu.</Text>}
        {showText2 && <Text style={styles.err}>Učet nebyl ověřený nebo vytvořený, ověř si učet a přihlaš se a nebo se registruj! :)</Text>}
        
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

        <CustomInput
          name="password"
          placeholder="Heslo"
          control={control}
          rules={{
            required: 'Heslo je potřeba! Nezapomeň na něj',
            minLength: { value: 6, message: 'Heslo musí mít alespoň 6 znaků' },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
              message:
                'Heslo musí obsahovat alespoň 6 znaků, včetně jednoho velkého písmene, jednoho malého písmene a jednoho čísla.',
            },
          }}
          secureTextEntry
        />
        <CustomButton
          text="Přihlasit se"
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Zapomněl si heslo?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          
        />
        <View style= {{marginTop: -40}}>
          <CustomButton
            text="Nemáš účet? Zaregistruj se."
            onPress={onSignUpPressed}
            type="TERTIARY"
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  banner: {
    width: '70%',
    maxWidth: 400,
    maxHeight: 700,
    fontSize: 36,
    fontWeight: 'medium',
    textAlign: 'center',
    color: "white",
    marginTop: 25
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  err:{
    fontSize: 24,
    color: "#652C47",
    textAlign: 'center',   
  },
});

export default SignInScreen