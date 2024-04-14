import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { ActivityIndicator, Alert, TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, ControllerTextInput, Icon, Screen, Text, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { VolunteeringStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface SignInScreenProps extends VolunteeringStackScreenProps<"SignIn"> { }

type FormValues = {
  dni: string;
  password: string;
}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen({ navigation }) {
  const authPasswordInput = useRef<TextInput>(null);

  const { volunteerStore: { login } } = useStores();

  const methods = useForm<FormValues>();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

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
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="MainNavigator.signInScreen.tabBarTitle" preset="heading" style={$signInScreen} />
      <Text tx="MainNavigator.signInScreen.enterDetails" preset="subheading" style={$enterDetails} />
      <FormProvider {...methods}>
        <ControllerTextInput
          name="dni"
          inputMode="numeric"
          containerStyle={$textField}
          labelTx="MainNavigator.signInScreen.inputs.dniFieldLabel"
          placeholderTx="MainNavigator.signInScreen.inputs.dniFieldPlaceholder"
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />
        <ControllerTextInput
          name="password"
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isPasswordHidden}
          labelTx="MainNavigator.signInScreen.inputs.passwordFieldLabel"
          placeholderTx="MainNavigator.signInScreen.inputs.passwordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
        />
        {methods.formState.isSubmitting ? <ActivityIndicator size={50} /> : (
          <Button
            testID="login-button"
            tx="MainNavigator.signInScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={methods.handleSubmit(async (values) => {
              const response = await login(values.dni, values.password);

              if (response.success) {
                Alert.alert("Sesión iniciada con éxito");
              } else {
                Alert.alert("Hubo un error con la petición al servidor.", response.message)
              }
            }, () => Alert.alert("Hay errores en el formulario.", "Revisa los campos del formulario"))}
          />)}
        <Text style={$signUpText} tx="MainNavigator.signInScreen.signUpText" />
        <Button
          testID="register-button"
          tx="MainNavigator.signInScreen.tapToSignUp"
          style={$tapButton}
          preset="filled"
          onPress={() => {
            navigation.navigate("Register")
          }}
        />
      </FormProvider>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signInScreen: TextStyle = {
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

const $signUpText: TextStyle = {
  marginTop: spacing.xxl
}
