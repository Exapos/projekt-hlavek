import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, { useState } from 'react'
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import firebase from '../../Firebase/firebase';


const auth = getAuth();


const SignUpScreen = () => {

  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const [loggedIn, setLoggedIn] = useState(false);

  const onHandleSignUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.info("Email byl poslán")
          })
        console.info("Uživatel byl vytvořen")
        const user = userCredentials.user;
        console.log(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  };



  const onRegisteredPressed = (data) => {
    console.warn(data)
    console.warn("Register")
    //Logika backendu
    onHandleSignUp(data.email, data.password)
    navigation.navigate('ConfirmEmail')
  }

  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Vytvoř si učet!</Text>

        <CustomInput
          name="username"
          placeholder="Uživatelské jméno"
          control={control}
          rules={{
            required: 'Vyplňte prosím uživatelské jméno',
            pattern: {
              value: /^[a-zA-Z0-9_-]{3,16}$/,
              message: 'Uživatelské jméno může obsahovat pouze písmena, číslice, pomlčky a podtržítka. Musí mít 3 až 16 znaků.',
            },
          }}
        />


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

        <CustomInput
          name="retypePassword"
          placeholder="Heslo znovu"
          control={control}
          rules={{
            required: 'Zopakujte heslo pro potvrzení!',
            validate: value => value === pwd || 'Hesla se neshodují!',
          }}
          secureTextEntry
        />

        <CustomButton
          text="Zaregistrovat se"
          onPress={handleSubmit(onRegisteredPressed)}
        />

        <Text style={styles.text}>Zegistrovaním, souhlasíš s mými <Text style={styles.link}>podmínkami</Text>, které <Text style={styles.link}>nejsou</Text> nikde k nalezení.</Text>

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

export default SignUpScreen