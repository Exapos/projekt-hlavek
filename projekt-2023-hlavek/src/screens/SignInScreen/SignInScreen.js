import { View, Text, useWindowDimensions, StyleSheet, ScrollView, TextInput } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, { useState } from 'react'
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

const SignInScreen = () => {

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors }, } = useForm();

  const onSignUpPressed = () => {
    console.warn("Sign up!")
    navigation.navigate('SignUp')
  }

  const onSignInPressed = (data) => {
    console.log(data);
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
        <Text style={[styles.banner, { height: height * 0.2 }]}>Vítej neznámý uživateli!</Text>

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
  }
});

export default SignInScreen