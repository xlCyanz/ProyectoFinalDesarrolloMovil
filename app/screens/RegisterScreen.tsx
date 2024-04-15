import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import React, { ComponentType, FC, useMemo, useState } from "react"
import { ActivityIndicator, Alert, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Button, ControllerTextInput, Icon, Screen, Text, TextFieldAccessoryProps } from "../components"

import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { IVolunteer } from "../services/api"
import { AppStackScreenProps } from "../navigators"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> { }

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen({ navigation }) {
  const {
    volunteerStore: { register },
  } = useStores()

  const methods = useForm<IVolunteer>();

  const [isPasswordHidden, setIsPasswordHidden] = useState(false)

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      {navigation.canGoBack() ? (
        <Icon icon="back" size={30} style={$backIcon} onPress={navigation.goBack} />
      ) : null}
      <Text testID="register-heading" tx="registerScreen.registerVolunteer" preset="heading" style={$register} />
      <Text tx="registerScreen.enterDetails" preset="subheading" style={$enterDetails} />
      <FormProvider {...methods}>
        <ControllerTextInput
          name="firstName"
          containerStyle={$textField}
          rules={{ required: "Campo requerido" }}
          labelTx="registerScreen.inputs.firstNameFieldLabel"
          placeholderTx="registerScreen.inputs.firstNameFieldPlaceholder"
        />
        <ControllerTextInput
          name="lastName"
          containerStyle={$textField}
          rules={{ required: "Campo requerido" }}
          labelTx="registerScreen.inputs.lastNameFieldLabel"
          placeholderTx="registerScreen.inputs.lastNameFieldPlaceholder"
        />
        <ControllerTextInput
          name="phoneNumber"
          containerStyle={$textField}
          rules={{ required: "Campo requerido" }}
          labelTx="registerScreen.inputs.phoneNumberFieldLabel"
          placeholderTx="registerScreen.inputs.phoneNumberFieldPlaceholder"
        />
        <ControllerTextInput
          name="dni"
          containerStyle={$textField}
          rules={{ required: "Campo requerido" }}
          labelTx="registerScreen.inputs.dniFieldLabel"
          placeholderTx="registerScreen.inputs.dniFieldPlaceholder"
        />
        <ControllerTextInput
          name="email"
          rules={{ required: "Campo requerido" }}
          labelTx="registerScreen.inputs.emailFieldLabel"
          placeholderTx="registerScreen.inputs.emailFieldPlaceholder"
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <ControllerTextInput
          name="password"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="password"
          containerStyle={$textField}
          secureTextEntry={isPasswordHidden}
          rules={{ required: "Campo requerido" }}
          labelTx="registerScreen.inputs.passwordFieldLabel"
          placeholderTx="registerScreen.inputs.passwordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
        />
        {methods.formState.isSubmitting ? <ActivityIndicator size={50} /> : (
          <Button
            preset="reversed"
            style={$tapButton}
            testID="login-button"
            tx="registerScreen.tapToRegister"
            onPress={methods.handleSubmit(async (values) => {
              const isRegistered = await register(values);

              if (isRegistered) {
                Alert.alert("Registrado con éxito", "Seras enviado a iniciar sesión", [{
                  text: "Ir", onPress: () => {
                    navigation.goBack();
                  }
                }])
              } else {
                Alert.alert("Hubo un error con la petición al servidor.")
              }
            }, () => Alert.alert("Hay errores en el formulario.", "Revisa los campos del formulario"))}
          />
        )}
      </FormProvider>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $register: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $backIcon: ImageStyle = {
  marginVertical: spacing.md
}