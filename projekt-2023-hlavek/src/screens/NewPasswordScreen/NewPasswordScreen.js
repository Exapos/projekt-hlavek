import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import React, { useState } from 'react'
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'



const NewPasswordScreen = () => {

  const { control, handleSubmit, formState: { errors }, watch } = useForm();

  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.warn("Sign in")
    navigation.navigate("SignIn")

  }

  const onSubmitPressed = (data) => {
    console.warn(data)

    console.warn("On submit pressed!")
    //Dodělat
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={[styles.title]}>Restartuj si své heslo!</Text>

        <CustomInput
          name="code"
          placeholder="Kód z emailu"
          control={control}
          rules={{
          required: 'Kod je opravdu potřeba :)',
          }}
        />

        <CustomInput
          name="password"
          placeholder="Nové heslo"
          control={control}
          rules={{
            required: 'Heslo si opravdu musíš změnit ＞﹏＜',
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
          text="Odeslat"
          onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen